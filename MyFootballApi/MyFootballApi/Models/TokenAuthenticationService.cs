using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace MyFootballApi.Models
{
    public class TokenAuthenticationService : IAuthenticateService
    {

        private readonly  IUserManagementService _userManagementService;
        private readonly  TokenManagement _tokenManagement;
        
        public TokenAuthenticationService(IUserManagementService service, IOptions<TokenManagement> tokenManagement)
        {
            _userManagementService =  service;
            _tokenManagement = tokenManagement.Value;
        }

        public bool IsAuthenticated(TokenRequest request, out string token)
        {
            string role;
            token = string.Empty;
            if (!_userManagementService.IsValidUser(request.Username, request.Password, out role)) return false;
            //Kuriant rakta reikes pridet role is duobazes
            var claims = new List<Claim>();
            claims.Add(new Claim(ClaimTypes.Name, request.Username));
            claims.Add(new Claim(ClaimTypes.Role, role));
            //simetrinis security raktas
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_tokenManagement.Secret));
            //įgaliojimai, raktas ir koduote naudojama.
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            //sukuriamas žetonas
            var jwtToken = new JwtSecurityToken(
                _tokenManagement.Issuer, //isdavejas
                _tokenManagement.Audience, // auditorija
                claims, // kas kreipiasi
                expires: DateTime.Now.AddMinutes(_tokenManagement.AccessExpiration), //galiojimo laikas
                signingCredentials: credentials // info
            );
            token = new JwtSecurityTokenHandler().WriteToken(jwtToken);
            return true;
        }
    }
}
