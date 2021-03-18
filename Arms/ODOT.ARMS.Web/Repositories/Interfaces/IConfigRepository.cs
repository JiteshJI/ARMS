using ODOT.ARMS.Web.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ODOT.ARMS.Web.Repositories.Interfaces
{
    public interface IConfigRepository
    {
        ConfigItem UpdateConfigItem(ConfigItem ci);

        ConfigItem GetConfigByKey(string key);
    }
}
