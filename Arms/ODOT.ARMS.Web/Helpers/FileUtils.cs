using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace ODOT.ARMS.Web.Helpers
{
    public class FileUtils
    {
        public const long FileSizeLimit = 52428800;    // 50 MB
        public static long FileSizeLimitMb { get { return FileSizeLimit / 1048576; } }

        public static bool IsValidFormExtension(string ext)
        {
            switch (ext)
            {
                case ".pdf":
                case ".doc":
                case ".docm":
                case ".docx":
                case ".dot":
                case ".dotx":
                case ".xlsx":
                case ".xlsm":
                    return true;
                default:
                    return false;
            }
        }
        public static string GetContentType(string path)
        {
            string ext = Path.GetExtension(path).ToLowerInvariant();
            return GetContentTypeByExtension(ext);
        }
        public static string GetContentTypeByExtension(string ext)
        {
            switch (ext)
            {
                case ".pdf":
                    return "application/pdf";
                case ".doc":
                case ".dot":
                case ".docx":
                    return "application/vnd.ms-word";
                case ".docm":
                case ".dotm":
                    return "application/vnd.ms-word.document.macroEnabled.12";
                case ".xls":
                case ".xlt":
                    return "application/vnd.ms-excel";
                case ".xlsx":
                    return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                case ".xltx":
                    return "application/vnd.openxmlformats-officedocument.spreadsheetml.template";
                case ".xlsm":
                    return "application/vnd.ms-excel.sheet.macroEnabled.12";
                case ".xltm":
                    return "application/vnd.ms-excel.template.macroEnabled.12";
                case ".zip":
                    return "application/zip";
                default:
                    return "application/*";
            }
        }
    }
}
