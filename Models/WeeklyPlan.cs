using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using FitnessTrackerAPI.Models; // nëse User ndodhet atje

public class WeeklyPlan
{
    [Key]
    public int Id { get; set; }

    public int UserId { get; set; }

    public string Day { get; set; } = string.Empty;

    public string Exercises { get; set; } = string.Empty;

    [ForeignKey("UserId")]
    public User? User { get; set; }
}
