using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ODOT.ARMS.Web.DTOs
{
    public class Encumbrance
    {
        public string FiscalYear { get; set; }
        public string EncumbranceNbr { get; set; }
        public string Sac { get; set; }
        public decimal PoLineAmt { get; set; }
        public decimal PoLineAdj { get; set; }
        public decimal PoLineDisb { get; set; }
        public decimal PoLineBalance { get; set; }
    }
}
