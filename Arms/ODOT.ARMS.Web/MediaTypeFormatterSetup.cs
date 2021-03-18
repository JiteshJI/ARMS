using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Formatters;
using System.Linq;

namespace ODOT.ARMS.Web
{
    public static class MediaTypeFormatterSetup
    {
        public static void SetInputOutMediaFormatter(MvcOptions setupAction)
        {
            var jsonOutputFormatter = setupAction.OutputFormatters
                            .OfType<NewtonsoftJsonOutputFormatter>().FirstOrDefault();

            if (jsonOutputFormatter != null)
            {
                //jsonOutputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.agencycategoryfordd+json");
                //jsonOutputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.agencycategory+json");
                //jsonOutputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.fundingsourcefordd+json");
                //jsonOutputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.fundingsource+json");
                //jsonOutputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.fundingtypefordd+json");
                jsonOutputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.fundingtype+json");
                //jsonOutputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.deliverystatusfordd+json");
                jsonOutputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.deliverystatus+json");
                //jsonOutputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.deliverytypefordd+json");
                //jsonOutputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.deliverytype+json");
                jsonOutputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.armsadministrationcategoryforDD+json");
                jsonOutputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.administrationcategory+json");
                jsonOutputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.administrationcategorybyspecificlistid+json");
                jsonOutputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.fundingspecificlistfordd+json");
                jsonOutputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.fundingspecificlist+json");
                jsonOutputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.contactsfordd+json");
                jsonOutputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.contacts+json");
                jsonOutputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.contactagencyfordd+json");
                jsonOutputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.agencycategoriesfordd+json");
                jsonOutputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.contactrolesfordd+json");
                jsonOutputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.contactnamesfordd+json");
                jsonOutputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.cbtypesfordd+json");
                jsonOutputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.cbstatusfordd+json");
                jsonOutputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.deliverytypefordd+json");
                jsonOutputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.deliverytype+json");
                jsonOutputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.deliverystatusfordd+json");
                jsonOutputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.fundingsourcefordd+json");
                jsonOutputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.fundingtypefordd+json");
                jsonOutputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.budgetcategoryfordd+json");
                jsonOutputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.fundingstatusfordd+json");
                jsonOutputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.implementationstatusfordd+json");
                jsonOutputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.meetingtypesfordd+json");
                jsonOutputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.modificationstatusfordd+json");
                jsonOutputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.projectclassificationfordd+json");
                jsonOutputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.projecttypesfordd+json");
                jsonOutputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.projectstatusesfordd+json");
                jsonOutputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.pooledfundingstatusfordd+json");
                jsonOutputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.primaryeventsfordd+json");
                jsonOutputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.secondaryeventsfordd+json");
                jsonOutputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.armsvendoraddressfordd+json");
                jsonOutputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.fundingtypeListfordd+json");
                jsonOutputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.fundingtypebyId+json");
                jsonOutputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.projectTypeListfordd+json");
                jsonOutputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.projectByIdfordd+json");
                jsonOutputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.projectListfordd+json");
                jsonOutputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.eventListfordd+json");
                jsonOutputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.GetPhaseStatusfordd+json");
                jsonOutputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.personnelfordd+json");
                jsonOutputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.getWarehousDetailById+json");
                //jsonOutputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.CBListfordd+json");
                jsonOutputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.projectsummarybyaltid+json");
                jsonOutputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.projectByAltId+json");
                jsonOutputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.projectInfoByAltId+json");
                jsonOutputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.cb+json");
                jsonOutputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.phase+json");
                jsonOutputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.event+json");
                jsonOutputFormatter.SupportedMediaTypes.Add("'application/vnd.dot.arms.invoice+json");
                jsonOutputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.eventsforproject+json");
                jsonOutputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.invoicesforproject+json");//Get invoices
                jsonOutputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.projdeliverablesByAltId+json");
                jsonOutputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.deliverablesforproject+json");
                jsonOutputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.budgetcatsforproject+json");
                jsonOutputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.encumbranceforinvoice+json");
                jsonOutputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.balanceforproject+json");


            }

            var jsonInputFormatter = setupAction.InputFormatters
               .OfType<NewtonsoftJsonInputFormatter>().FirstOrDefault();

            if (jsonInputFormatter != null)
            {
                jsonInputFormatter.SupportedMediaTypes.Add("application/json-patch+json");
                jsonInputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.contactsforcreate+json");
                jsonInputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.contactsforupdate+json");
                jsonInputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.agencyforcreate+json");
                jsonInputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.agencyforupdate+json");
                jsonInputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.contactagencyforcreate+json");
                jsonInputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.contactagencyforupdate+json");
                jsonInputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.administrationCategoryforcreate+json");
                jsonInputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.administrationCategoryforupdate+json");
                jsonInputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.projectTypeforcreate+json");
                jsonInputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.projectTypefordelete+json");
                jsonInputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.projectforcreate+json");
                jsonInputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.projectforupdate+json");
                jsonInputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.eventsforcreate+json");
                jsonInputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.eventsforupdate+json");
                jsonInputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.event+json");//My Accept Type for Event
                jsonInputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.uploadfiles+json");//My Accept Type for upload files
                jsonInputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.fileforupdate+json");
                jsonInputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.personnelforcreate+json");
                jsonInputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.personnelforupdate+json");
                jsonInputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.cbcategoryfordd+json");
                jsonInputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.projectsummaryforupdate+json");
                jsonInputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.cb+json");//My Accept Type for Event
                jsonInputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.cbforupdate+json");
                jsonInputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.cbforcreate+json");
                jsonInputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.referencesfordd+json");
                jsonInputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.Funding+json");//My Accept Type for fin-funding
                jsonInputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.configforproject+json");//Get config type
                jsonInputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.configforupdate+json");//Get config type
                jsonInputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.invoiceforcreate+json");//Add invoice
                jsonInputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.invoiceforupdate+json");//Update invoice
                jsonInputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.deliverableforcreate+json");
                jsonInputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.deliverableforupdate+json");
                jsonInputFormatter.SupportedMediaTypes.Add("application/vnd.dot.arms.customdeliverable+json");

            }
        }
    }
}
