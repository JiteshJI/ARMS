using ODOT.ARMS.Web.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ODOT.ARMS.Web.Repositories.Interfaces
{
    public interface IWarehouseRepository
    {
        public Task<List<Encumbrance>> GetEncumbranceByPid(string pid);
    }
}
