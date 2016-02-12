using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DictionaryAPI
{
    public interface IDictionary
    {
        Definition Define(string word);
    }
}
