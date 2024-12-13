using System.Data;
using WebApplication1.Database;
using WebApplication1.Database.Entities;
using WebApplication1.DTOs.RequestDTO;
using WebApplication1.DTOs.ResponseDTO;
using WebApplication1.IRepository;
using WebApplication1.IService;
using WebApplication1.Repository;

namespace WebApplication1.Service
{
    public class UserService : IUserService
    {
        private readonly IUserRepo _userRepository;

        public UserService(IUserRepo userRepository)
        {
            _userRepository = userRepository;
        }
        public async Task<bool> CreateUser(UserRequestDTO userRequestDTO)
        {
            try
            {


                var user = new User
                {
                    FirstName = userRequestDTO.FirstName,
                    LastName = userRequestDTO.LastName,
                    Email = userRequestDTO.Email,
                    MobileNumber = userRequestDTO.MobileNumber,
                    Password = BCrypt.Net.BCrypt.HashPassword(userRequestDTO.Password), // Hash the password directly
                    Role = userRequestDTO.Role,
                    Status = userRequestDTO.Status
                };


                var data = await _userRepository.CreateUser(user);
                if (data == true)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {

                Console.WriteLine(ex.Message);
                throw;
            }
        }

        public async Task<string> Login(LoginRequestDTO loginrequest)
        {

            var data = await _userRepository.Login(loginrequest);

            return data;

        }

        //public async Task<User> Login(string email, string password, Role role)
        //{
        //    var dataUser = await _leaveDBContext.Users.FirstOrDefaultAsync(u => u.Email == email && u.Status == Status.Accepted);

        //    if (dataUser == null)
        //    {
        //        if (email == "admin123@gmail.com" && password == "admin1234" && role == Role.Admin)
        //        {
        //            // Your admin login logic
        //        }

        //        throw new Exception("Invalid Email ID!");
        //    }

        //    if (!BCrypt.Net.BCrypt.Verify(password, dataUser.Password))
        //    {
        //        throw new Exception("Wrong Password");
        //    }

        //    var token = CreateToken(dataUser);
        //    return token;
        //}



        public async Task<bool> UserRequest(int id, int status)
        {
            var data = await _userRepository.UserRequest(id, status);
            if (data)
            {
                return true;
            }
            else
            {
                return false;
            }
        }





        public async Task<List<AllUserResponse>> AllUsers()
        {
            var data = await _userRepository.AllUsers();
            var response = new List<AllUserResponse>();

            if (data == null || !data.Any())
            {
                throw new Exception("No Data Exists!");
            }
            else
            {
                foreach (var d in data)
                {
                    var allUserResponse = new AllUserResponse
                    {
                        FirstName = d.FirstName,
                        LastName = d.LastName,
                        Email = d.Email,
                        MobileNumber = d.MobileNumber,
                        UserId = d.UserId,
                        Status = d.Status.ToString()
                    };

                    response.Add(allUserResponse);
                }
            }

            return response;
        }

        public async Task<UserResponseDTO> UserById(int Id)
        {
            try
            {

                var user = await _userRepository.UserById(Id);

                if (user == null)
                {
                    return null;
                }

                var response = new UserResponseDTO
                {
                    UserId = user.UserId,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Email = user.Email,
                    MobileNumber = user.MobileNumber,
                
                    Password = user.Password,
                };

                return response;
            }
            catch (Exception ex)
            {

                Console.WriteLine(ex.Message);
                return null;
            }
        }


        public async Task<bool> DeleteById(int Id)
        {
            var data = await _userRepository.DeleteById(Id);

            return data;
        }
    }
}
