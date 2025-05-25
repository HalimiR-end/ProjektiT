using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using FitnessTrackerAPI.Models;

public class JwtService
{
    private readonly string _secret;
    private readonly string _issuer;
    private readonly string _audience;
    private readonly int _expires;

    public JwtService(IConfiguration config)
    {
        _secret = config["Jwt:Key"] ?? throw new ArgumentNullException("Jwt:Key");
        _issuer = config["Jwt:Issuer"] ?? throw new ArgumentNullException("Jwt:Issuer");
        _audience = config["Jwt:Audience"] ?? throw new ArgumentNullException("Jwt:Audience");
        _expires = int.Parse(config["Jwt:ExpiresInMinutes"] ?? throw new ArgumentNullException("Jwt:ExpiresInMinutes"));
    }

    public string GenerateToken(User user)
    {
        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()), // 👈 e nevojshme për filtrimin në API
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secret));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _issuer,
            audience: _audience,
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(_expires),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
