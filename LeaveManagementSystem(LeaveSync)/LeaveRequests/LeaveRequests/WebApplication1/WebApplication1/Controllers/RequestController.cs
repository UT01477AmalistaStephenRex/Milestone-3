using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Database.Entities;
using WebApplication1.DTOs.RequestDTO;
using WebApplication1.IService;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RequestController : ControllerBase
    {
        private readonly IRequestService _requestService;

        public RequestController(IRequestService requestService)
        {
            _requestService = requestService;
        }


        //User request inai anuppuvadhatku
        [HttpPost("RequestRent")]
        public async Task<IActionResult> RequestLeave(LRequestDTO requestDTO)
        {
            try
            {
                var data = await _requestService.RequestLeave(requestDTO);
                return Ok(data);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        //anuppapadum anaiththu request kalaiyum petru kolla
        [HttpGet("AllRequest")]
        public async Task<IActionResult> AllRequest()
        {
            try
            {
                var data = await _requestService.AllRequest();
                return Ok(data);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //id inai veithu request inai petru kollla (request id)
        [HttpGet("RequestById{id}")]
        public async Task<IActionResult> GetRequestById(int id)
        {
            try
            {
                var data = await _requestService.GetRequestById(id);
                return Ok(data);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        //request inai admin accept or pending or reject seivadhtku (request id , user id)
        [HttpPut("AcceptRejectRequest{id}")]
        public async Task<IActionResult> AcceptRejectRequest(int id, Status status)
        {
            try
            {
                var data = await _requestService.AcceptRejectRequest(id, status);
                return Ok(data);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        //User inaduiya history inai view seivadhtku
        [HttpGet("HistoryUser{id}")]
        public async Task<IActionResult> CountHistory(int id)
        {
            try
            {

                var data = await _requestService.CountHistory(id);
                return Ok(data);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
