using ODOT.ARMS.Web.Entities.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace ODOT.ARMS.Web.Entities.Extensions
{
    public static class EnumExtensions
    {
        public static string GetDescription(this Enum givenEnum)
        {
            Type givenEnumType = givenEnum.GetType();
            MemberInfo[] memberInfo = givenEnumType.GetMember(givenEnum.ToString());

            if ((memberInfo != null && memberInfo.Length > 0))
            {
                var _Attribs = memberInfo[0].GetCustomAttributes(typeof(DescriptionAttribute), false);
                if ((_Attribs != null && _Attribs.Length > 0))
                {
                    return ((DescriptionAttribute)_Attribs[0]).Description;
                }
            }

            return givenEnum.ToString();
        }

        public static string GetCode(this Enum givenEnum)
        {
            Type givenEnumType = givenEnum.GetType();
            MemberInfo[] memberInfo = givenEnumType.GetMember(givenEnum.ToString());

            if ((memberInfo != null && memberInfo.Length > 0))
            {
                var _Attribs = memberInfo[0].GetCustomAttributes(typeof(CodeDescriptionAttribute), false);
                if ((_Attribs != null && _Attribs.Length > 0))
                {
                    return ((CodeDescriptionAttribute)_Attribs[0]).Code;
                }
            }

            return givenEnum.ToString();
        }
        
        public static string GetCodeDescription(this Enum givenEnum)
        {
            Type givenEnumType = givenEnum.GetType();
            MemberInfo[] memberInfo = givenEnumType.GetMember(givenEnum.ToString());

            if ((memberInfo != null && memberInfo.Length > 0))
            {
                var _Attribs = memberInfo[0].GetCustomAttributes(typeof(CodeDescriptionAttribute), false);
                if ((_Attribs != null && _Attribs.Length > 0))
                {
                    return ((CodeDescriptionAttribute)_Attribs[0]).Description;
                }
            }

            return givenEnum.ToString();
        }

    }
}
