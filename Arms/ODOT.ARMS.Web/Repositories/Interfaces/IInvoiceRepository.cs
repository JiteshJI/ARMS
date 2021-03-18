using ODOT.ARMS.Web.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ODOT.ARMS.Web.Repositories.Interfaces
{
    public interface IInvoiceRepository
    {
        public Task<List<Invoice>> GetAllInvoicesAsync();
        public Task<List<InvoiceDetail>> GetAllInvoiceDetailsAsync();
        public Task<IEnumerable<Invoice>> GetAllInvoicesByProjectIdAsync(Guid ProjId);
        public Task<IEnumerable<InvoiceDetail>> GetInvoiceDetailsByInvoiceIdAsync(Guid InvoiceId);        
        public Task<Invoice> GetInvoiceByIdAsync(Guid InvoiceId);
        public Task<Invoice> AddInvoiceAsync(Invoice invoice);
        public Invoice AddInvoice(Invoice invoice);
        public Invoice UpdateInvoice(Invoice invoice);

        public Task<Invoice> UpdateInvoiceAsync(Invoice invoice);
        public Task<List<SrcFileCount>> GetUploadFileCountsAsync(Guid projectId);
        public void AddInvoiceDetail(InvoiceDetail invD);
        public void UpdateInvoiceDetail(InvoiceDetail invD);
        public void DeleteInvoiceDetail(InvoiceDetail invD);//This can happen if the budget category changes
        public Task<List<BudgetCatDD>> GetBudgetCategoriesAsync(Guid projectId);

        public ProjectBalance GetProjectBalance(Guid projectId);



    }
}
