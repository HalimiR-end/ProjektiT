using Microsoft.EntityFrameworkCore;
using FitnessTrackerAPI.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;

namespace FitnessTrackerAPI.Data
{
    public class FitnessContext : DbContext
    {
        public FitnessContext(DbContextOptions<FitnessContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Workout> Workouts { get; set; }
        public DbSet<WorkoutEntry> WorkoutEntries { get; set; }
        public DbSet<WeeklyPlan> WeeklyPlans { get; set; }
        

    }

    public static class FitnessContextSeed
    {
        public static void SeedData(IApplicationBuilder app)
        {
            using var scope = app.ApplicationServices.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<FitnessContext>();

            context.Database.EnsureCreated();

            if (!context.Users.Any())
            {
                var user = new User
                {
                    Username = "testuser",
                    Email = "test@example.com",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("test123")
                };

                context.Users.Add(user);
                context.SaveChanges(); // Ruajmë user-in para workout-it

                if (!context.Workouts.Any())
                {
                    var workout = new Workout
                    {
                        Name = "Morning Routine",
                        Description = "A simple morning routine",
                        Date = DateTime.Now,
                        UserId = user.Id // Lidhim me përdoruesin e krijuar
                    };

                    context.Workouts.Add(workout);
                    context.SaveChanges();

                    var entries = new List<WorkoutEntry>
                    {
                        new WorkoutEntry
                        {
                            Exercise = "Push-ups",
                            Reps = 15,
                            Sets = 3,
                            WorkoutId = workout.Id
                        },
                        new WorkoutEntry
                        {
                            Exercise = "Sit-ups",
                            Reps = 20,
                            Sets = 3,
                            WorkoutId = workout.Id
                        }
                    };

                    context.WorkoutEntries.AddRange(entries);
                    context.SaveChanges();
                }
            }
        }
    }
}
