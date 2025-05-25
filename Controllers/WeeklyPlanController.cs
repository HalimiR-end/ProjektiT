using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FitnessTrackerAPI.Data;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;



[ApiController]
[Route("api/[controller]")]
public class WeeklyPlanController : ControllerBase
{
    private readonly FitnessContext _context;

    public WeeklyPlanController(FitnessContext context)
    {
        _context = context;
    }

    private int GetUserId() =>
        int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> GetPlan()
    {
        var userId = GetUserId();
        var plan = await _context.WeeklyPlans
            .Where(p => p.UserId == userId)
            .ToListAsync();
        return Ok(plan);
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> SavePlan([FromBody] List<WeeklyPlan> days)
    {
        var userId = GetUserId();

        // fshij të vjetrat
        var existing = await _context.WeeklyPlans
            .Where(p => p.UserId == userId)
            .ToListAsync();
        _context.WeeklyPlans.RemoveRange(existing);

        foreach (var day in days)
        {
            day.UserId = userId;
            _context.WeeklyPlans.Add(day);
        }

        await _context.SaveChangesAsync();
        return Ok("Plani u ruajt me sukses");
    }
}
