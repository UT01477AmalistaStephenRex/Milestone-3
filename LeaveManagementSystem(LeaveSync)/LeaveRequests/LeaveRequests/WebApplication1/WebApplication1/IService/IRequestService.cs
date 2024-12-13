using Microsoft.AspNetCore.Mvc;
using WebApplication1.Database.Entities;
using WebApplication1.DTOs.RequestDTO;
using WebApplication1.DTOs.ResponseDTO;

namespace WebApplication1.IService
{
    public interface IRequestService
    {

        Task<bool> RequestLeave(LRequestDTO requestDTO);
        Task<List<AllLeaveResponseDTO>> AllRequest();

        Task<LeaveRequest> GetRequestById(int id);
        Task<bool> AcceptRejectRequest(int id, int status);
        Task<ICollection<object>> CountHistory(int id);

    }
}
