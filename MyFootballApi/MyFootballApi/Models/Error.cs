using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyFootballApi.Models
{
    public class Error
    {
        public String code{ get; set; }
        public String description { get; set; }

        public Error(string code, string description)
        {
            this.code = code;
            this.description = description;
        }
    }
}
