﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyFootballApi.Models;
using Microsoft.AspNetCore.Authorization;

namespace MyFootballApi.Controllers
{
   
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthenticateService _authService;
        public AuthenticationController(IAuthenticateService authService)
        {
            _authService = authService;
        }

        //api/authentication
        [AllowAnonymous]
        [HttpPost]
        public IActionResult RequestToken([FromBody] TokenRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            string token;
            if (_authService.IsAuthenticated(request, out token))
            {
                return Ok(new { token });
            }

            return BadRequest( new { message = "There is no such a user. Please check Password or Username" });
        }
    }
}