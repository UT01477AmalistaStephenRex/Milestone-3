using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using MimeKit;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WebApplication1.Database;
using WebApplication1.Database.Entities;
using WebApplication1.DTOs.RequestDTO;
using WebApplication1.IRepository;

namespace WebApplication1.Repository
{
    public class UserRepository : IUserRepo
    {
        private readonly LeaveDBContext _leaveDBContext;
        private readonly IConfiguration _configuration;

        public UserRepository(LeaveDBContext leaveDBContext, IConfiguration configuration)
        {
            _leaveDBContext = leaveDBContext;
      
            _configuration = configuration;

        }

        public async Task<bool> CreateUser(User user)
        {

            var checkUser = await _leaveDBContext.Users.FirstOrDefaultAsync(u => u.Email == user.Email);
            if (checkUser != null && checkUser.Status == Status.Accepted)
            {
                throw new Exception("User already exists!");
            }

            var data = await _leaveDBContext.Users.AddAsync(user);
            var rows = await _leaveDBContext.SaveChangesAsync();


            return rows > 0;



        }


        public async Task<string> Login(LoginRequestDTO loginrequest)
        {
            var dataUser = await _leaveDBContext.Users.FirstOrDefaultAsync(u => u.Email == loginrequest.Email && u.Status == Status.Accepted);

            if (dataUser == null)
            {
                if (loginrequest.Email == "admin123@gmail.com" && loginrequest.Password == "admin1234" && loginrequest.Role== Role.Admin)
                {
                    var admin = new User
                    {
                        UserId = new Random().Next(1, 1000000), // Unique ID for admin
                        FirstName = "Super",
                        LastName = "Admin",
                        Email = "admin123@gmail.com",
                        Role = Role.Admin,
                        MobileNumber = "0765678679",
                        Status = Status.Accepted
                    };


                    var adminToken = CreateToken(admin);
                    var data = await _leaveDBContext.leaveRequests
                .Where(r => r.Status == Status.Pending)
                .ToListAsync();

                    foreach (var req in data)
                    {

                        var usermail = await _leaveDBContext.Users.FirstOrDefaultAsync(u => u.UserId == req.UserId);
                      
                        if (usermail == null)
                        {
                            Console.WriteLine($"User not found for UserId: {req.UserId}");
                            continue;
                        }


                        var emailMessage = new MimeMessage();
                        emailMessage.From.Add(new MailboxAddress("No-Reply", "Me2@gmail.com"));
                        emailMessage.To.Add(new MailboxAddress("", usermail.Email));
                        emailMessage.Subject = "Late Return Notice";
                        emailMessage.Body = new TextPart("plain");
                        //{
                        //    Text = $"Dear {usermail.FirstName},\n\nYour rental request is overdue for Request ID:{req.RequestId}. Please return the bike as soon as possible. Your Final Charge :"
                        //};


                        //try
                        //{
                        //    using (var client = new SmtpClient())
                        //    {
                        //        await client.ConnectAsync("smtp.gmail.com", 587, MailKit.Security.SecureSocketOptions.StartTls);
                        //        await client.AuthenticateAsync("sivapakthangopikrishna69@gmail.com", "plev rbuw jsgh iipc");
                        //        await client.SendAsync(emailMessage);
                        //        await client.DisconnectAsync(true);
                        //    }
                        //}
                        //catch (Exception ex)
                        //{
                        //    Console.WriteLine($"Email sending failed for UserId: {req.UserId}. Error: {ex.Message}");
                        //    continue;
                        //}



                    }


                    await _leaveDBContext.SaveChangesAsync();
                    return adminToken;

                }
                throw new Exception("Invalid Email ID!");
            }

            if (!BCrypt.Net.BCrypt.Verify(loginrequest.Password, dataUser.Password))
            {
                throw new Exception("Wrong Password");
            }



            var token = CreateToken(dataUser);
            Console.WriteLine(token);
            return token;
        }


        private string CreateToken(User user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);


            var claims = new[]
            {

        new Claim("userId", user.UserId.ToString()),
        new Claim("email", user.Email),
        new Claim("role", user.Role.ToString()),
        new Claim("firstname",user.FirstName.ToString()),
        new Claim("lastname",user.LastName.ToString())
    };


            var token = new JwtSecurityToken(
                issuer: "Leave",
                audience: "Users",
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(30),
                signingCredentials: credentials
            );


            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public async Task<bool> UserRequest(int id, int status)
        {
            var data = await _leaveDBContext.Users.FirstOrDefaultAsync(u => u.UserId == id);
            if (data == null)
            {
                throw new Exception("No Such User!");
            }

            if (status == 2)
            {
                data.Status = Status.Rejected;
            }
            else if (status == 6)
            {
                data.Status = Status.Accepted;
            }


            //_bikeDbContext.Entry(data).Property(d => d.Status).IsModified = true;


            try
            {
                await _leaveDBContext.SaveChangesAsync();
                await _leaveDBContext.Entry(data).ReloadAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw;
            }

          return true;
        }
        public async Task<List<User>> AllUsers()
        {

            var data = await _leaveDBContext.Users.ToListAsync();
            return data;
        }

        public async Task<User> UserById(int Id)
        {
            var data = await _leaveDBContext.Users.FirstOrDefaultAsync(u => u.UserId == Id);

            if (data == null)
            {
                throw new Exception("No User Found!");
            }
            return data;
        }

        public async Task<bool> DeleteById(int Id)
        {
            var data = await _leaveDBContext.Users.FirstOrDefaultAsync(u => u.UserId == Id);

            if (data == null)
            {
                throw new Exception("No Such User!");
            }

            var deleteuser = _leaveDBContext.Users.Remove(data);
            await _leaveDBContext.SaveChangesAsync();

            if (deleteuser != null)
            {
                return true;
            }
            else
            {
                return false;
            }

        }

    }


}
