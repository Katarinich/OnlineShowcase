﻿using System;
using System.Reflection;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using FluentValidation.AspNetCore;
using OnlineShowcase.Web.Api.Validation;

namespace OnlineShowcase.Web.Api
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true);

            builder.AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container
        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("AllowAnyOrigin",
                    policyBuilder => policyBuilder
                        .AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials());
            });

            services.AddMvc(setup => {
                setup.Filters.Add(typeof(ModelValidationAttribute));
            }).AddFluentValidation(config =>
            {
                config.RegisterValidatorsFromAssembly(Assembly.GetEntryAssembly());
            });

            return DIConfig.Build(services, Configuration);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            var keyAsBase64 = Configuration["auth0:clientSecret"].Replace('_', '/').Replace('-', '+');
            var keyAsBytes = Convert.FromBase64String(keyAsBase64);

            var options = new JwtBearerOptions
            {
                TokenValidationParameters = new TokenValidationParameters
                {
                    ValidIssuer = $"https://{Configuration["auth0:Domain"]}/",
                    ValidAudience = Configuration["auth0:ClientId"],
                    IssuerSigningKey = new SymmetricSecurityKey(keyAsBytes),
                    RoleClaimType = "groups"
                }
            };

            app.UseJwtBearerAuthentication(options);

            app.UseCors("AllowAnyOrigin");
            
            app.UseMvc(RoutingConfig.Register);
        }
    }
}
