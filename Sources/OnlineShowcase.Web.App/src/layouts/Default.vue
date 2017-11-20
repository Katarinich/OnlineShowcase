<template>
  <div :class="{ 'edit-content': isEditMode }">
    <div class='header'>
      <div class='bottom-header'>
          <div class='container'>
              <div class='header-bottom-left'>
                  <div class='logo'>
                    <router-link 
                      :to="{ name: 'home.index' }"
                    >
                      <img src='../../static/images/logo.png' alt='OnlineShowcase'/>
                    </router-link>
                  </div>
                  <div class='links'>
                    <router-link :to="{ name: 'aboutus.index' }">About Us</router-link>
                    <router-link :to="{ name: 'contactus.index' }">Contact Us</router-link>
                  </div>
                  <div class='clearfix'> </div>
              </div>

              <div class='header-bottom-right'>
                <div class='account'>
                  <a v-if="isAuthenticated"><span> </span>{{$store.state.user.profile.name}}</a>
                  <a v-else><span> </span>Guest</a>
                </div>

                <ul class='login'>
                  <li v-if="!isAuthenticated"><a @click.prevent="login"><span> </span>Login or Sign Up</a></li>
                  <li v-else><router-link :to="{ name: 'logout.index' }"><span> </span>Sign Out</router-link></li>
                </ul>
                <div class='clearfix'> </div>
              </div>
              <div class='clearfix'> </div>
          </div>
      </div>
    </div>

    <div class='container'>
      <slot></slot>
      <div class='sub-cate'>
        <div class='top-nav rsidebar span_1_of_left'>
          <h3 class='cate'>CATEGORIES</h3>
          <category-list></category-list>
        </div>
      </div>
      <div class='clearfix'></div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Auth0Lock from 'auth0-lock'
  import toastr from 'toastr'

  import CategoryList from '../components/CategoryList'

  export default {
    name: 'default-layout',

    data() {
      return {
        lock: new Auth0Lock(process.env.CLIENT_ID, process.env.AUTH_DOMAIN, {
          autoclose: true,
          auth: {
            responseType: 'token id_token',
            params: {
              scope: 'openid'
            }
          }
        })
      }
    },

    components: {
      CategoryList
    },

    computed: {
      isAuthenticated() {
        return this.$store.getters['user/isAuthenticated']
      },
      isEditMode() {
        return this.$store.getters['user/isContentEditor']
      }
    },

    mounted() {
      Vue.nextTick(() => {
        this.lock.on('authenticated', authResult => {
          this.lock.getUserInfo(authResult.accessToken, (error, profile) => {
            if (error) {
              return
            }

            this.$store.dispatch('user/set', { profile, token: authResult.idToken })
          })
        })

        this.lock.on('authorization_error', error => {
          toastr.error(error)
        })
      })
    },

    methods: {
      login() {
        this.lock.show()
      }
    }
  }
</script>
