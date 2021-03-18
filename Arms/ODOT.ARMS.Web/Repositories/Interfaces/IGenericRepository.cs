using System.Threading.Tasks;

namespace ODOT.ARMS.Web.Repositories.Interfaces
{
    public interface IGenericRepository<T> where T : class
    {
        Task<T> GetByIdAsync(int id);
        Task<T> GetByIdAsync(string id);
        void AddAsync(T entity);
        Task Add(T entity);
        void Update(T entity);
        void Delete(int id);
        void Delete(T entity);
    }
}
