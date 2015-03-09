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
        public WordDefinition Get(string q)
        {
            DictServiceSoapClient client = new DictServiceSoapClient();
            return client.DefineInDict(ConfigurationManager.AppSettings["DictionaryId"].ToString(), q);
        }
    }
}
