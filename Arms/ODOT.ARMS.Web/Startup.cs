using System.Linq;
//using System.Text;
using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json.Serialization;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using FluentValidation.AspNetCore;
using ODOT.ARMS.Web.Repositories.Interfaces;
using ODOT.ARMS.Web.Repositories;
using System;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.Extensions.Hosting;
using ODOT.ARMS.Web.Entities;
using ODOT.ARMS.Web.Services.Interfaces;
using ODOT.ARMS.Web.Services;


namespace ODOT.ARMS.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)

        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_3_0);


            //services.AddControllers().AddNewtonsoftJson();

            services.AddControllers()
            .AddNewtonsoftJson(options =>
            {
                //options.SerializerSettings.ContractResolver = new DefaultContractResolver();

                options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                /* configure Json.NET to ignore cycles that it finds in the object graph */
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;

                //options.SerializerSettings.ContractResolver = new DefaultContractResolver();

                // Configure a custom converter
                //options.SerializerOptions.Converters.Add(new MyCustomJsonConverter());
            });


            _ = services.AddMvc(setupAction =>
            {
                MediaTypeFormatterSetup.SetInputOutMediaFormatter(setupAction);
            })
            .AddFluentValidation();
            //.AddJsonOptions(options =>
            //{
            //    options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            /* configure Json.NET to ignore cycles that it finds in the object graph */
            //     options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            // });

            /* Globally handle all Model State errors and return them to the client ina consistent manner */
            services.Configure<ApiBehaviorOptions>(options =>
            {
                options.InvalidModelStateResponseFactory = context =>
                {
                    var problemDetails = new ValidationProblemDetails(context.ModelState)
                    {
                        Instance = context.HttpContext.Request.Path,
                        Status = StatusCodes.Status400BadRequest,
                        Type = "https://asp.net/core",
                        Detail = "Please refer to the errors property for additional details."
                    };
                    return new BadRequestObjectResult(problemDetails)
                    {
                        ContentTypes = { "application/problem+json", "application/problem+xml" }
                    };
                };
            });

            services.AddDbContextPool<Entities.ArmsWarehouseContext>(options => options.UseLazyLoadingProxies()
                       .UseSqlServer(Configuration["ConnectionStrings:WarehouseConnection"])).
                       AddMemoryCache().
                       AddHttpContextAccessor().
                       AddScoped<IWarehouseRepository, WarehouseRepository>().
                       AddSingleton<IActionContextAccessor, ActionContextAccessor>().
                       AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies()).
                       AddSpaStaticFiles(configuration =>
                       {
                           configuration.RootPath = "ClientApp/dist/ClientApp";
                       });


            services.AddDbContextPool<Entities.ARMSContext>(options => options.UseLazyLoadingProxies()
            //.UseLoggerFactory(loggerFactory)
            .UseSqlServer(Configuration["ConnectionStrings:ArmsConnection"]));

            services.AddMemoryCache();
            services.AddHttpContextAccessor();

            services.AddScoped<IARMSDataRepository, ARMSDataRepository>();
            services.AddScoped<IContactsRepository, ContactsRepository>();
            services.AddScoped<IArmsFundingType, ArmsFundingTypeRepository>();
            services.AddScoped<IArmsAdministrationCategory, ArmsAdministrationCategoryRepository>();
            services.AddScoped<IContactAgencyRepository, ContactAgencyRepository>();
            services.AddScoped<IArmsProjectRepository, ArmsProjectRepository>();
            services.AddScoped<IArmsPhase, ArmsPhaseRepository>();
            services.AddScoped<IArmsEventRepository, EventRepository>();
            services.AddScoped<IArmsPersonnelRepository, ArmsPersonnelRepository>();
            services.AddScoped<IArmsEventUploadRepository, ArmsEventUploadRepository>();
            services.AddScoped<IArmsControllingBoardRepository, ControllingBoardRepository>();
            services.AddScoped<IArmsBudgetRepository, ArmsBudgetRepository>();
            services.AddScoped<IArmsFundingRepository, ArmsFundingRepository>();
            services.AddScoped<IArmsLedgerRepository, ArmsLedgerRepository>();
            services.AddScoped<IConfigRepository, ConfigRepository>();
            services.AddScoped<IInvoiceRepository, InvoiceRepository>();
            services.AddScoped<ICustomDeliverableRepository, CustomDeliverableRepository>();
            services.AddScoped<IArmsFinOverviewRepository, ArmsFinOverviewRepository>();

            // register an IHttpContextAccessor so we can access the current
            // HttpContext in services by injecting it
            //services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddSingleton<IActionContextAccessor, ActionContextAccessor>();

            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
            // Configure settings for the environment
            services.Configure<FileSettings>(Configuration.GetSection("Files"));
            services.AddScoped<IFileService, FileService>();

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist/ClientApp";
            });


        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment() || env.IsEnvironment("Local"))
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            //app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            app.UseRouting();
            app.UseCors();


            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute("default", "{controller=Home}/{action=Index}/{id?}");
                //endpoints.MapControllerRoute("default", "{controller=Home}/{action=Index}");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsEnvironment("Local"))
                {
                    spa.UseProxyToSpaDevelopmentServer("http://localhost:4200");
                    //spa.UseAngularCliServer(npmScript: "debug");
                }
            });
        }
    }
}
