using System;

namespace ODOT.ARMS.Web.DTOs
{
    public class LedgerForDD
    {
        public string Phase { get; set; }
        public string Category { get; set; }
        public string Title { get; set; }
        public string TransactionType { get; set; }
        public Decimal Amount { get; set; }
        public string User { get; set; }
        public DateTime Date { get; set; }
        public Int64 RowNum { get; set; }
    }
}