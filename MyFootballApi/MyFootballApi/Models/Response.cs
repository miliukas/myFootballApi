using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyFootballApi.Models
{
    public class Response
    {
        public Boolean succeeded { get; set; }
        public List<Error> errors = new List<Error>();

        public void DublicateUserName(string name)
        {
            this.succeeded = false;
            StringBuilder desc = new StringBuilder();
            desc.AppendFormat("User name '{0}' is already taken.", name);
            Error error = new Error("DublicateUserName", desc.ToString());
            errors.Add(error);
        }

        public void NoErrors()
        {
            succeeded = true;
            errors.DefaultIfEmpty();
        }
    }
}

