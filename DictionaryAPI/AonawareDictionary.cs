using DictionaryAPI.DictService;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace DictionaryAPI
{
    public class AonawareDictionary : IDictionary
    {
        public Definition Define(string word)
        {
            Definition result = new Definition { Word = word };
            DictServiceSoapClient client = new DictServiceSoapClient();
            WordDefinition definitions = client.DefineInDict(ConfigurationManager.AppSettings["DictionaryId"].ToString(), word);

            foreach (DictionaryAPI.DictService.Definition d in definitions.Definitions)
            {
                result.Definitions.Add(d.WordDefinition);
            }

            return result;
        }
    }
}