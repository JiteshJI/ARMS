using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

//==================================================================================================
//
// This object will contain the project balances
// to be used in invoic alerts
//
//=================================================================================================
namespace ODOT.ARMS.Web.Entities
{
    public class ProjectBalance
    {
        public Guid ProjId { get; set; }
        public int DaysToCompletion { get; set; }
        public decimal WithholdingAmtReached { get; set; }
        public decimal EncumbranceAmtReached { get; set; }
        public decimal BudgetAmtReached { get; set; }
    }
}
