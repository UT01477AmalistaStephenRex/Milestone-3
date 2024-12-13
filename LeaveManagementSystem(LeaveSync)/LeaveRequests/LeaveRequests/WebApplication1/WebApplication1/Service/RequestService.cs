using WebApplication1.Database.Entities;
using WebApplication1.DTOs.RequestDTO;
using WebApplication1.DTOs.ResponseDTO;
using WebApplication1.IRepository;
using WebApplication1.IService;

namespace WebApplication1.Service
{
    public class RequestService : IRequestService
    {
        private readonly IRequestRepo _requestRepo;

        public RequestService(IRequestRepo requestRepo)
        {
          _requestRepo = requestRepo;
        }
        public async Task<bool> RequestLeave(LRequestDTO requestDTO)
        {
            var leaveRequest = new LeaveRequest
            {
                UserId = requestDTO.UserId,
                Reason = requestDTO.Reason,
              
           
                FromDate = requestDTO.FromDate,
                ApplyDate = requestDTO.ApplyDate,
                Days = requestDTO.Days,
            
               
                Status = Status.Waiting

            };

            var checkRequest = await _requestRepo.CheckRequest(requestDTO.UserId, requestDTO.FromDate, requestDTO.ApplyDate);

            if (checkRequest)
            {
                throw new Exception("Already Booked!");
            }

            var data = await _requestRepo.RequestLeave(leaveRequest);

            if (data)
            {
                return true;
            }
            else
            {
                return false;
            }

        }

        public async Task<List<AllLeaveResponseDTO>> AllRequest()
        {
            var data = await _requestRepo.AllRequest();
            if (data == null)
            {
                throw new Exception("Nothing Found!");
            }

            var response = new List<AllLeaveResponseDTO>();

            foreach (var d in data)
            {
                var rentalresponse = new AllLeaveResponseDTO
                {
                    RequestId = d.RequestId,
                    UserId = d.UserId,
                    FromDate = d.FromDate,
                    ApplyDate = d.ApplyDate,
                    Days = d.Days,
                    Status = d.Status.ToString()


                };

                response.Add(rentalresponse);
            }
            return response;

        }

        public async Task<LeaveRequest> GetRequestById(int id)
        {
            var data = await _requestRepo.GetRequestById(id);

            if (data == null)
            {
                throw new Exception("No Data Found!");
            }
            return data;
        }
        public async Task<bool> AcceptRejectRequest(int id, int status)
        {
            var data = await _requestRepo.AcceptRejectRequest(id, status);
            if (data)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public async Task<ICollection<object>> CountHistory(int id)
        {
            var data = await _requestRepo.CountHistory(id);

            if (data == null)
            {

            }
            return data;
        }
    }
}
