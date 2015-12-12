(function (dictService) {

    var div = document.createElement('div');
    div.style.position = 'absolute';
    div.style.width = '300px';
    div.style.height = '200px';
    div.style.backgroundColor = 'rgb(255, 241, 179)';
    div.style.overflow = 'auto';
    div.style.padding = '20px';
    div.style.zIndex = 100;
    div.style.display = 'none';
    div.style.border = '1px solid black';
    div.style.font = '13px sans-serif';
    div.style.boxShadow = '3px 3px 10px';
    document.body.appendChild(div);

    function getSelectionText() {
        var text = "";
        if (window.getSelection) {
            text = window.getSelection().toString();
        } else if (document.selection && document.selection.type != "Control") {
            text = document.selection.createRange().text;
        }
        return text;
    }

    function trim(word) {
        return word.replace(/^\s+/, '').replace(/\s+$/, '');
    }

    /**************
    Event handlers
    ***************/
    function dblclickHandler(e) {
        var word = trim(getSelectionText());
        var x, y;
        if (e.pageX || e.pageY) {
            x = e.pageX;
            y = e.pageY;
        }
        else {
            x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }

        if (word) {
            div.innerText = div.textContent = '';
            div.style.display = 'block';
            div.style.top = y + 'px';
            div.style.left = x + 'px';

            //Show loading image
            var img = document.createElement('img');
            img.src = 'data:image/gif;base64,R0lGODlhKwArAMQTAKmqrI+Pkefn6NfY2fr6+mxsbMfHyczNz5mZm7a3ueLi49zd3u3t7tLS1Hh5esDAwvPz9KGipISEhf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wUmlnaHRzPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvcmlnaHRzLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcFJpZ2h0czpNYXJrZWQ9IkZhbHNlIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InV1aWQ6M0I4QjcyREFCRDYxREYxMTlCRTZEMTI4QkIxRDIzN0YiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Nzg1MDlCNzBCMTU1MTFFMEJFNjZFRkYzMzg1MEFDRkIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Nzg1MDlCNkZCMTU1MTFFMEJFNjZFRkYzMzg1MEFDRkIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGODdGMTE3NDA3MjA2ODExOTQ1N0NBNTQ4MkQyMTVGNCIgc3RSZWY6ZG9jdW1lbnRJRD0idXVpZDozQjhCNzJEQUJENjFERjExOUJFNkQxMjhCQjFEMjM3RiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY19bV1NPS0dDPzs3My8rJyMfGxcTDwsHAv769vLu6ubi3trW0s7KxsK+urayrqqmop6alpKOioaCfnp2cm5qZmJeWlZSTkpGQj46NjIuKiYiHhoWEg4KBgH9+fXx7enl4d3Z1dHNycXBvbm1sa2ppaGdmZWRjYmFgX15dXFtaWVhXVlVUU1JRUE9OTUxLSklIR0ZFRENCQUA/Pj08Ozo5ODc2NTQzMjEwLy4tLCsqKSgnJiUkIyIhIB8eHRwbGhkYFxYVFBMSERAPDg0MCwoJCAcGBQQDAgEAACH5BAkAABMALAAAAAArACsAAAX/4CSOZGmeaKqmzOq+ggEEUm1Hj/DuxBEFQKCt5pA4Ag/CLuULOmlDo6P4WJYgAAQisA1KoLbidBpQWCeKiFbLdQLeYOnY0VguEOr1NjGAlHoAcmMFBy9pankID34qDAlzBQ4FdY0AEZdqCTo7AgiDU2YpCZiXCUpWEJ5TBQUSKQOWlhEJZySekaxVJgRvb7OntRMQAZKsDowksL0ALcEjAristCUJvgAGziURxZElDMsAyNkTDKzmoSINy9jjJBHmBdMiD7EA6O0TBvCuI+DA+OXgkQCHrwS3AgN76SooIoBAEd8UMhzh0NymCdXeLGRYkdXAagnkMWxgLgCJkCD/uxVUAGBjPpQJ7k00MQBmoZkoIMBMIA4nCQMwKfksseCBUaM9hxI4avSAyjMQIDwtoYDpA6G1GAgQwGAqiQYPDIQ1MMBrCgJbtzJIesWA27cN2KJAm5bBWhcM3h4wcODAArMiCDBQoEDtWsAjGPRdvFhB1z8QBBAubBgxCQYN+mZuwJnzgMkLQk+u+xjVgM6dB6hWHXrBaLVSnTE43WA169avuVpeIXjB6tauXx+eKFgAbsJcYw+FaHf58hAAIfkECQAAEwAsAAAAACsAKwAABf/gJI5kaZ5oqqbM6r7MkURIjQQIYAhvTzSACI1WwwWOuAehlxoAgkKiDYmUBAzMEiTxjEZtt9vRKpEgeFnBcw2NJt7iark8YC7Y64hhAdEOEgFkcxIHLwp4TwZ9KluBZQ4SDnUqDIgJLT0CCHMOkJgoXGxKWRMEEYMOASl3oqQkp52dDycEoU8JS64iEJuxDrkkTrafuhMCvg4JJg8AoYXFJAC+ElpvXAmL0CIMvgVoIn/WWNqvnQXJJDLWCuTpsQWqIw/WuO0jBA7n5yTzb7P2I8wVKMDvwbxnACcg0Edwm0GDCAEuzFfg08MHEe0tHNhQhIGH4xJSHEjCgMmPwNq6cePYccKAkwaIkTPAMp4IBQdOLki4caCyERAO5MyZEhoDlgV2kmggVKhSchFYOjAhoKnQbMWOsvxJ4gdTpgOKkhqAFOsIBg3SpmVndOuqAWobKBDL5MHACCoIDNjLdwHdhBMg8B0s4C9ACAsGLEi8eIEACEUJQIDAwPALxI0zK1igQIBnAZ09V9ZGQMDizQpSq+4cWgCD0eQgrFYN+rPo15aZSPbcWrTr17ATSmbg+vdryLnJAQfM/EQIACH5BAkAABMALAAAAAArACsAAAX/4CSOZGmeaKqmzOq+TPMANB0BydG+L9EkteAtQkQADgReagAMOolQhLShLDFmTiEAGpF6AZDqRABsZh/obdQbQCyUioTc+VgkSYRFwotoBwJULmRyc0dhKhAPbH8BbyoED4Q4DzswAIyMhygGkYQGd0oEl4wSESkKaJ5iJKMSARIGJwScqZ+rIwQRfxKuoCOoaJGat2OvvBIPJge0DwPEJQnGriUQBsy+zwzHvAIkAtbWgc+sxw7JIwPL1t3jJA3lpiMH89bY4wQSDvkSJPPLB+1M8HJA0J0/ZwFJRMhXUESMBvMQJhSBgCDBSg0yNpA4MYJFByQGaBQ3kWFDEQNExGa094zAR5C/UmasFPCAxQIISDBIKZJdQo8FHBRIgGcBzwEsVzEgGLSATxEKFhgd8PQZgKYF+FmRKhVpOwVChQ41QSAqVwVJX0AIUKBt0GEjICgwu6BqFbZuC5w7IWDugqgC0qKAgCBv1kd9584NDEeC4QI0T0AQkFgxA8Eirj4mmYIA5b6VGUBImuCx3lAMPqumHFkE3rwAqxBgkHo1ZXsR8jqwy2M2bdoCaMOdsLQt0Xu+f1+euIIAAQijmSv5Lb36iRAAIfkECQAAEwAsAAAAACsAKwAABf/gJI5kaZ5oqqbM6r7QYiQADdxP074vsTyJIM12KyYGBF5K8AAKg8VodKAsQQ5NJ7Qm7SZ2SobBkNUGs9FIGqAIj8nagyJJ8hnSkfzixTi8swMQKxAGanl5CG0qEA1+Yw8HgjwMCYcRCBGSKAMHjgYNdEoElZeXACyNnQZUVSSVCLAIDScEA6kHoK11ALGwoSMMDcKdmroiDL0BsyULto2KxiQPCAHUESW1zrnRJBDU1AECJAwDztDcIwkB6wEGJALltmDoIgPsAacjC83lv/QQ9wKQ2BePnglwEgSK8EHwnMEJABJKkABMwb4FDg1GDDBxBwEFFjE+JBFxIsURIC+2jhzB0eQ7kBb9oSNgcuI4mAuK0RtQ89oICAJgihtZ0oGDB3UEBAUp0xgDCQ6gSnDIQCnIedwiGnWgsFvVpU2rCNhq1B22r0oFhIWBgKyEpgTQKuXWlixSFBAYfFWAtUfdrV1p6UWrc4WAAFsLGM14drCAwigYAFBM2UGBZSviDl57rBDlzwUOiIIAoWkDdpYLqAbtADM9Batjyy4goW/W2bPvrjSAW/VRyAYDyMbHeOXXlchThAAAIfkECQAAEwAsAAAAACsAKwAABf/gJI5kaZ5oqqbM6r6QMBjGY9vHAL08ITQHWu2WKBYfAwKPNTg4hbeH0QhILJYlwqIBfA5t0wSgOn60sJDBgOsVOg9S6niuWKbX7OCCoSQRFAZkc2NXLhALalxAC30pEAeDdCt/iHg6SwxikTspAguVDQqNPQ+RCY6flXVYJKWDAyc+qQOirH6ac6MiEAoKn0m2JQyDEQ0mAr2fAsEmgQAREQBZyL6MzCUQ0Npnu9QLy9clBtoRByQM3pzhIwvaCKcj6L216yME0AjQ5wLU9SURCAIisIcOGTh/IhIIHCiCQUEFBxEqFMjNIb+I/gAIDHCuIMZ6AQMEYNjQo65wEBCtiBxJAoJFAerqDVgZQBrBgtzqJaBpwI9LdDFR0gyAkYBDPhIDSFBK0g+Bk8wESFi6tCdCFARUTl0K9eqECFunWvXqB2zYpi4YDMi5QgCCsFM/pjBQoG4EtiaGSXCwl68DWEvqCi6AwABbAgciOFjMeK85LIMjOxiJgLHlxoCxRIg82EEBxp8vB8DLAwDn054bP1gHwfTpz7D5JggaTgGAAJwnJ1hFNp7D3sBHhAAAIfkECQAAEwAsAAAAACsAKwAABf/gJI5kaZ5oqqbM6r4EoyxDYx/NIEBvH8+DoK1xKB4MhoOC0EtBZjThzYhEPgyKZokggEZr02P1QX4ceFquAhoEN6JiQ3kuaKq9QQGDSeIOygmBgXUuXF1sAnwpBA1kgoMrMYczS00QBo+BLU4ChwuJWhMEmIEACQ+LnYeEoSIGpgCxCycxDJ0KoK0iBA+wpoojkofAugyxxw0mELZdm7okB8emWwzMlc8kENIAzqLVnd3YIr3I2d874iUL0qgjy8zE4gSxEbF93+HpE9tbEPH65OyJyKePREBuBV0kkJbQBYAIECM0VEEgYr2JKRZYTIARRQKLB0wwiBCAY0EICCKrpESQz0GBlwAKPkBAE0FMEy9zZhHHoCbNZDhzFgiARtc8nxH+JRA6FBsABAECQAV6wqVQBEV9AIgKNcBNFAqYDt35QgDJqFyznjDA1CVCFQwSSECLlqyKB2IdOIhwZksDABLmCo5K1cWBtgX0OpBAM0Lgx5CjztLCQIJQxZglLIb8OALBFw+sJk6cWW9kA+kgyH2JufTcB/+eCUgQwGVmBA9YdZxQ7fPugiEAACH5BAkAABMALAAAAAArACsAAAX/4CSOZGmeaKqiBEOsMExAjKDc9yK4cT/XNtxiuBgUF7weiwHEKYjFgXTQGDCUpV8zR5xKG2DwAIKdtJiC4HPh/IYbB3jj6mNuFQLIi9RSwA+AgXQrZ0A2SSkECoAGB40Ggyk0hgJ7MRANBpqbZCqTaYg+A5uaB4RAkWUND6ysAoQQnWUjBAetrJazShC3Dwu6sw0JwwkPwGUQxMOyxzEHyr/NPQrKBiUPCQrSJgQJAMQkCAXjptskwwDfJOPjAeYkD9/pIwzsBe7vIvHpALL2+Pn2zRthz0E+EfwGirBXIFUzAgkBkJBgz9q7BQmNjQBgD0E+AwkbkFBQ0KEuCBFTqDmwJ3EbSH4JTCQoqK0Zg4gDuLFbGSBXmW4REvrUt9OBR2AJIgQNmhNFgKIIhhJKqlRpzBQKVjrY6iDAqx43qyrtt2JA0a0ATJLghaAtgqo1VxjgylWCBAANfEIYkCCA27/RYjSgW9dugKAAAij269dthLjTAtC1S9nwYsV/yep6IGFyZQmXFyMQ+fCB5M6VA4BeHOGAVGAKHkT4DBqAga8HSdjJzbtECAAh+QQJAAATACwAAAAAKwArAAAF/+AkjmRpnmiqpszqvgQBMTQj1BDx7iI01zeBcCjI8VQEoG2oECieUMgRlVwyodiFYiHQTUlJomK53S7OaIX0O5IxjGCIAE1frNkwwWDPH9zxLgQLfXteKBEFBQaABAoNDQOQCykJiYktgI6Pj5glEJaJA4ATBJEHjwOGI5WgnXgQB7GnAiagBRGjIwuypyUKtrS5pAYHxAd/AKAIwroGzgbBIgGgi8wTAs8GoiO2rrkEBg/PJKAO1iPh4tUiyuciBw/xDyMM7e7w8pifBQ4Fy/cPEsQjl8iBOXcBEwgk0Y+fA1W5IChUOG9EAIMG1wlTMDHBARKV+jnAZc1Ax0kjFLmINOjtVQIALxP8mSABowMAzA4A2LmwRAKbDqLhYbATJoBtYIAigHiEwMuiCZhOeIBRggSSbB4U3YnyxEUHNa9KRaJ1awIVDMJalYBA6AoGT7fONDHA4FqrMldAMLC1qIIXB9RKCEA4QYOZEBY8iNCXK48Bd60SJowAZoIICCJoZrz17xEBCNZOpoygdObNnCPkZWOA8ODRpkujZowUD4EHCGAHiL0ZQIOxbLABKL1btseW7mq4W34iBAAh+QQJAAATACwAAAAAKwArAAAF/+AkjmRpnmiqpszqvigBQQQB3zGj67SNm4lCQdIqQXZIhu83UUiEQoSJIKhWGYLdEnaAQgMnrHWc3a4MXiggdlQoBG+rGdVNF9YrAsPthgvmJQx2Ego3VHx9gCNPXgEQP1QLiAIpD2lgTCICC5xujyYQDo2KLwQKnJ1zQVAOhZkjBAOoC0UkjAUOeK8jAgOykiUKQg7EtbsTsb6yW0HEBRHHwcoDxgiixAfRJAwNyq4i18SkTAQN5r4kxMQS2iXm5yS4xFLtIwsH7yMM6g7Q9SIDDuBrUIsfvX8BBTZIt47dvwkHDAjMtsiBBIvjIBnYiI+ENQkgKbYTsFHiABIPLsCC1KVtwIOSlHhZBCnhUzQCD15utCkiAE0JCdq5zCnRREqaAWLugpAgZ85vIyD4nBohowoCBh40fQnIAMgAYFn+MJCg7NMUCKaGtVoCa1mzBlQIAEs3AABjKxhofduU54kBdQMgQPDAL6gDABIDeKtURQO6gyM/GGCGwIIHihe/hbpiQVrBkRFEiLA4Z+bTixu/gAAg9OjXqFEXfnXANezYiRMsuIlYNGzSpxM0YAuDwYEEAEZnfkDwoYkdzqOXCAEAIfkECQAAEwAsAAAAACsAKwAABf/gJI5kaZ5oqqbM6r4KEBQ0jbw4CSVO7dOPHO7xKxYSwpVCYiwOkqlGr1kISAKHEwECIeQMtJ64EDFAVgSGmuF1NQrjHqD1ggjWbKVjzw8IhHYCd2ptKAFxCIU5DIKDZygPfHs3UCIMCo15JhASkgGKSQQCmIKaJAaSDn+VIwQKpAKgE4d7EgCsJZekdCMCtZ2PuCKur4KKkZ22wiWjxcETERLSEk/LIxALrwq8E8nSsrgEC9mYJNNX1iXj5ObTEekkCuOvIwzTAbfwIgoD87zSVvLp4zev0JUrlPQNWDiORICHD58tI9CA4QISMiBWS8eg4sJVIh5ADIAEnoIGHrm5CYCIIIBEVgQOoFwIKkKAlgiCWFMgE+XFEgdwIkDArRKEAz0bFJ1AYKhTAOBwUEQqcwC4Bk4RRChZaYABA0iVpgDgNMLWqCkofgV7YOMJCGbjbl2a4uiDtTJfllCgVS4AMysgNHhA+C5YuiYWxAXAmLGBBaBcHUiQoPBaxCdimG3MGUBhyqAfVDaMGQWDBJ1TMwZNufABvS8GqOaMmjVhBRMHoFbNurICtFA6PqANIMFj2PDW6FueIgQAIfkECQAAEwAsAAAAACsAKwAABf/gJI5kaZ5oqqbM6r5KEjhFbQeJ8u5QIhU0m9DmABB2KYNjSVsCh8MEssSYMZnPILQWmYoGkqvYgShrod7DeBk5HEmMAwKNHDgk+LAE0FIxIjYGSAJ5d2QCSAwNiEgIeXgRb15IBo8SXZNTBAGPCJKZLw8SnJyMoCQEqSeOpFKnqAyxECUCAba2fa8iEAKxDJ8Gtzi6cAK9vyQAwg3EI7zHsyMIwtHNBArGsSS20wjNJMbHJN0Irt8TDNi9IwxlZQDnIgLq2iLu5fET89nj7pjnCgIaIxEBQcFI5wgsEJhrQgKDESIMOAchILaGByJGFPRNwEJs1dBpjBjylMKPAj6yTQAQgSUAjro8LlhoakQDlwD46CIwYGbAkhMI5ByaQKWmBT0/Gp0wYGjOB6cUDEi6AOiIBE4BPFiq4lqDqTNrmoCQFUCChisgDGjwNSnXEQpythx6wCqqBQcOsAVrt8SCsjkPKChJgMECA3n1tu1rQkBWrAkiJ0hs4IGBy4kXe2GANSdkyQ8SPBh9GbHiBW9XLIhsVnLk0aRN60U7iafr17BL601J8TBs2LsZE/OVr3iJEAAh+QQFAAATACwAAAAAKwArAAAF/+AkjmRpnmiqpszqvsKDSE5tI4ny7sQT0DSbozAcShKQXcrwkzgdQWGtQHU8lCVBxMnlQoXEMFXSwi5+za4TEZnZxNTCQdkIoCVNQCNJIhwiRXFUVy5ndnZ4SCsMAEOCcisQCId2EQJKCgGPBWUoAJQBAARYE5KPEil1CJMIAKQkmoIJJwSrtqKvIwQSjycHtquXuSMKvSYAwITDIwBxDiYMbNJ8yyMJEgidI3/SytUuCRHiEQPfOwDjEaPmLumu7O0A8t7wJ4zyEfT1Ip3o8/siCEBYxwzfu3oMBDBgQHCCvIcNvxEQoJABtQkP/AFYUA8CxYUXGzwEoG9ZwooN77Y9vLiMgIKPDEskGDnHHIOXFU2IHKktl0ucMUsQmPnwQUQsExW8XHh0wgB5MxMYWCZA6UeWJB5EBSC1qYqJC6wqVMEggdmzBrCmcLkg7FKvIwScPfugAdyAAga0VfryLrG5Wh/UFRCRQMIBiPe+VIsiRmDBgg0YOIB4QIPLlRUTJkXAAOQHkkMfGH25Qeawm3Mp8AxaNGnMicMyVuLygOTRr00nVhCUnUfLB0oj5u3328KeAJOHAAA7';
            div.appendChild(img);

            dictService
                .meaning(word)
                .done(function (data) {
                    var meaningArr = [];

                    for (var i = 0, j = data.definitionsField.length; i < j; i++) {
                        meaningArr.push(data.definitionsField[i].wordDefinitionField);
                    }
                    div.innerText = div.textContent = meaningArr.join('');
                })
                .always(function () {
                    div.removeChild(img);
                });
        }
    }

    function clickHandler(e) {
        div.innerText = '';
        div.style.display = 'none';
    }

    function divClickHandler(e) {
        e.stopPropagation();
    }

    function divDblClickHandler(e) {
        e.stopPropagation();
    }

    /*****************
    Bind/Unbind events
    ******************/
    document.addEventListener('dblclick', dblclickHandler);
    document.addEventListener('click', clickHandler);
    div.addEventListener('dblclick', divDblClickHandler);
    div.addEventListener('click', divClickHandler);
})((function () {

    /***************************
    A simplified deferred class
    ****************************/
    function deferred() {
        var doneCallbacks = [],
            failCallbacks = [],
            alwaysCallbacks = [];

        function isFunction(arg) {
            return typeof arg === 'function';
        }

        this.done = function (fn) {
            isFunction(fn) && doneCallbacks.push(fn);
            return this;
        };

        this.fail = function (fn) {
            isFunction(fn) && failCallbacks.push(fn);
            return this;
        };

        this.always = function (fn) {
            isFunction(fn) && alwaysCallbacks.push(fn);
            return this;
        };

        this.resolve = function (args) {
            for (var i = 0, j = doneCallbacks.length; i < j; i++) {
                doneCallbacks[i](args);
            }
            for (var i = 0, j = alwaysCallbacks.length; i < j; i++) {
                alwaysCallbacks[i](args);
            }
        }

        this.reject = function (args) {
            for (var i = 0, j = failCallbacks.length; i < j; i++) {
                failCallbacks[i](args);
            }
            for (var i = 0, j = alwaysCallbacks.length; i < j; i++) {
                alwaysCallbacks[i](args);
            }
        }
    }

    /*********************
    Simple ajax utility
    **********************/
    function ajax(options) {
        /*************************
        options:{
            url:'',
            headers:{},
            async:true/false
        }
        **************************/
        var xmlhttp,
            def = new deferred;
        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }
        else {// code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function () {
            var status = xmlhttp.status,
                isSuccess = status >= 200 && status < 300 || status === 304;
            if (xmlhttp.readyState === 4) {
                if (isSuccess) {
                    def.resolve(JSON.parse(xmlhttp.responseText));
                } else {
                    def.reject();
                }
            }
        }
        xmlhttp.open(options.method || 'GET', options.url, options.async ? options.async : true);
        for (var i in options.headers) {
            xmlhttp.setRequestHeader(i, options.headers[i]);
        }
        xmlhttp.send();

        return def;
    }

    return {
        meaning: function (word) {
            return ajax({
                url: 'http://localhost:55140/api/define?q=' + word,
                headers: {
                    Accept: 'application/json'
                }
            });
        }
    };
})());