using WebApplication1.Database.Entities;
using WebApplication1.DTOs.RequestDTO;

namespace WebApplication1.IRepository
{
    public interface IUserRepo
    {
        Task<bool> CreateUser(User user);
        Task<string> Login(LoginRequestDTO loginrequest);

        Task<bool> UserRequest(int id, int status);
        Task<List<User>> AllUsers();
        Task<User> UserById(int Id);
        Task<bool> DeleteById(int Id);
    }
}
