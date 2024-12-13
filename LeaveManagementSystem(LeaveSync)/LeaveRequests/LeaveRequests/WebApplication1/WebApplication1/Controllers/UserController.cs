using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.DTOs.RequestDTO;
using WebApplication1.IService;
using WebApplication1.Service;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }
        //User oruvarai create seivadhatku

        [HttpPost("CreateUser")]
        public async Task<IActionResult> CreateUser([FromForm] UserRequestDTO userRequestDTO)
        {
            try
            {



                var result = await _userService.CreateUser(userRequestDTO);



                return Ok(result);
            }
            catch (Exception ex)
            {


                return BadRequest(ex.Message);
            }
        }

        //User Login aaavadhatku

        //[HttpPost("Login")]
        //public async Task<IActionResult> Login(LoginRequestDTO loginrequest)
        //{
        //    try
        //    {
        //        var data = await _userService.Login(loginrequest);
        //        return Ok(data);

        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}

        [HttpPost("Login")]
        public IActionResult Login([FromBody] LoginRequest loginRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Your authentication logic here
            return Ok(new { Message = "Login successful" });
        }

        //User request kodutha udan Accept or Reject Seivadhtaku
        [HttpPut("UserRequest{id}")]
        public async Task<IActionResult> UserRequest(int id, int status)
        {
            try
            {
                var data = await _userService.UserRequest(id, status);
                return Ok(data);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        //Request Kodukkapadum anaithu user kalaiyum petru kollvadhatku
        
        [HttpGet("AllUsers")]
        public async Task<IActionResult> AllUsers()
        {
            try
            {

                var data = await _userService.AllUsers();
                return Ok(data);

            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }


        //ID inai veithu oru user iani view seivadhatku
        [Authorize]
        [HttpGet("UserById")]
        public async Task<IActionResult> UserById(int Id)
        {
            try
            {
                var data = await _userService.UserById(Id);
                return Ok(data);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        //id inai veithu user oruvarai delete seivadhtku

      
        [HttpDelete("DeleteById")]
        public async Task<IActionResult> DeleteById(int Id)
        {
            try
            {
                var data = await _userService.DeleteById(Id);
                return Ok(data);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
