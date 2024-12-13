using WebApplication1.Database.Entities;
using WebApplication1.DTOs.RequestDTO;
using WebApplication1.DTOs.ResponseDTO;

namespace WebApplication1.IService
{
    public interface IUserService
    {
        Task<bool> CreateUser(UserRequestDTO userRequestDTO);
        Task<string> Login(LoginRequestDTO loginrequest);
        Task<bool> UserRequest(int id, int status);
        Task<List<AllUserResponse>> AllUsers();
        Task<UserResponseDTO> UserById(int Id);
        Task<bool> DeleteById(int Id);
    }
}
