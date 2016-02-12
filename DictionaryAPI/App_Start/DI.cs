using Microsoft.Practices.Unity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace DictionaryAPI
{
    public static class DI
    {
        public static void Register(HttpConfiguration config)
        {
            var container = new UnityContainer();
            container.RegisterType<IDictionary, AonawareDictionary>();
            config.DependencyResolver = new UnityResolver(container);            
        }
    }
}