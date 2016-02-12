using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DictionaryAPI
{
    public class Definition
    {
        public Definition()
        {
            this.Definitions = new List<string>();
        }

        public string Word { get; set; }

        public List<string> Definitions { get; set; }
    }
}