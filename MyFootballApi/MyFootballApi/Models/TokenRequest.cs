using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace MyFootballApi.Models
{
    public class TokenRequest
    {
        [Required]
        [JsonProperty("username")]
        public string Username{ get; set; }

        [Required]
        [JsonProperty("password")]
        public string Password { get; set; }
    }
}
