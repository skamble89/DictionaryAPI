using DictionaryAPI.DictService;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace DictionaryAPI.Controllers
{
    public class DefineController : ApiController
    {
        public IDictionary dictionary { get; set; }

        public DefineController(IDictionary dict)
        {
            this.dictionary = dict;
        }

        public Definition Get(string q)
        {            
            return this.dictionary.Define(q);
        }
    }
}
