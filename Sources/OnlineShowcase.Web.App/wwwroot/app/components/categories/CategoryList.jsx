﻿import React, { Component } from 'react'
import { Link } from 'react-router'
import UserStore from '../../stores/UserStore'
import CategoriesStore from '../../stores/CategoriesStore'
import CategoryActions from '../../actions/CategoryActions'

function getState() {
    return {
        isEditMode: UserStore.isContentEditor(),
        categories: CategoriesStore.getCategories()
    };
}

export default class CategoryList extends Component {
    constructor() {
        super();

        this._onChange = this._onChange.bind(this);
        this.state = getState();

        if (!this.state.categories) {
            CategoryActions.loadCategories();
        }
    }

    componentWillMount() {
        UserStore.addChangeListener(this._onChange);
        CategoriesStore.addAllLoadedListener(this._onChange);
    }

    componentWillUnmount() {
        UserStore.removeChangeListener(this._onChange);
        CategoriesStore.removeAllLoadedListener(this._onChange);
    }

    render() {
        const categories = !this.state.categories ? null : (
            this.state.categories.map((category) => {
                const hasSubMenu = category.children.length > 0 || this.state.isEditMode;
                return <li key={category.id}>
            <a href='#'>{category.name} {!hasSubMenu ? null : <img className='arrow-img' src='images/arrow1.png' alt=''/>}</a>
            {!hasSubMenu ? null : (<ul className='cute'>{category.children.map((child) => {
                    return <li key={child.id}><a href='product.html'>{child.name}</a></li>
                    })}
                { this.state.isEditMode ? <li><Link to={`categories/${category.id}/new`}>Add category</Link></li> : null }
                    </ul>)}
                </li>;
            })
        );

        return (
            <ul className='menu'>
                {categories}
                { this.state.isEditMode ? <li><Link to='categories/new'>Add category</Link></li> : null }
        </ul>
        )
    }

    _onChange() {
        this.setState(getState());
    }
}