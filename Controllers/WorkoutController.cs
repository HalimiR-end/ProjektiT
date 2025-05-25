using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FitnessTrackerAPI.Data;
using FitnessTrackerAPI.Models;
using System.Security.Claims;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using System;

namespace FitnessTrackerAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class WorkoutController : ControllerBase
{
    private readonly FitnessContext _context;

    public WorkoutController(FitnessContext context)
    {
        _context = context;
    }

    private int GetUserId()
    {
        var claim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (claim == null) throw new UnauthorizedAccessException("No user ID in token");
        return int.Parse(claim);
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Workout>>> GetAll()
    {
        var userId = GetUserId();
        return await _context.Workouts
            .Include(w => w.Entries)
            .Where(w => w.UserId == userId)
            .ToListAsync();
    }

    [HttpPost]
    public async Task<IActionResult> CreateWorkout([FromBody] Workout workout)
    {
        var userId = GetUserId();

        if (workout == null || string.IsNullOrEmpty(workout.Name))
            return BadRequest("Workout name is required.");

        workout.UserId = userId;
        workout.Date = System.DateTime.UtcNow;

        _context.Workouts.Add(workout);
        await _context.SaveChangesAsync();

        return Ok(workout);
    }

    [HttpGet("stats")]
    public async Task<IActionResult> GetStats()
    {
        var userId = GetUserId();

        var stats = await _context.WorkoutEntries
            .Include(e => e.Workout)
            .Where(e => e.Workout.UserId == userId)
            .GroupBy(e => e.Exercise)
            .Select(g => new {
                Exercise = g.Key,
                TotalReps = g.Sum(e => e.Reps * e.Sets),
                Count = g.Count()
            })
            .OrderByDescending(x => x.TotalReps)
            .Take(5)
            .ToListAsync();

        return Ok(stats);
    }
}
