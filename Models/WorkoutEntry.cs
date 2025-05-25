namespace FitnessTrackerAPI.Models;
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
public class WorkoutEntry
{
    public int Id { get; set; }
    public string Exercise { get; set; } = "";
    public int Reps { get; set; }
    public int Sets { get; set; }
    public string? MuscleGroup { get; set; }

    public int WorkoutId { get; set; }
    public Workout Workout { get; set; } = null!;
}
