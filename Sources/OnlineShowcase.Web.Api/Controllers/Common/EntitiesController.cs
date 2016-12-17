﻿using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OnlineShowcase.Core;
using OnlineShowcase.Web.Api.Validation;
using Humanizer;
using OnlineShowcase.Web.Api.Model;
using System.Linq;
using OnlineShowcase.Web.Api.ModelBinders;

namespace OnlineShowcase.Web.Api.Controllers.Common
{
    public abstract class EntitiesController<TViewModel, TDomainModel, TFilter>
        : BaseEntityController<TViewModel, TDomainModel> where TFilter : Core.Filtering.Filter
    {
        private readonly string entityRouteName;

        protected EntitiesController(ISafeManager<TDomainModel> safeManager, IUnsafeManager<TDomainModel> unsafeManager, IMapper mapper, string entityRouteName = null)
            : base(safeManager, unsafeManager, mapper)
        {            
            this.entityRouteName = entityRouteName ?? this.Name.Singularize();
        }

        [HttpGet]
        [AllowAnonymous]
        [ModelValidation]
        [ActionName("Index")]
        public virtual async Task<ActionResult> Get([ModelBinder(BinderType = typeof(FilterModelBinder))]Filter filter)
        {
            TFilter domainFilter;
            try
            {
                domainFilter = this.Mapper.Map<Filter, TFilter>(filter);
            }
            catch (Exception ex)
            {
                return this.BadRequest(new { ex.Message });
            }

            return this.Ok((await this.SafeManager.Get(domainFilter)).Select(item => this.Mapper.Map<TViewModel>(item)));
        }

        [HttpPost]
        [ModelValidation]
        [ActionName("Index")]
        public virtual async Task<ActionResult> Post([FromBody]TViewModel model)
        {
            var id = await this.UnsafeManager.Add(this.Mapper.Map<TDomainModel>(model));

            var result = new { id };

            return this.CreatedAtRoute(this.entityRouteName, result, result);
        }
    }
}