using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using System.Text;
using System.Net;
using System.Xml;
using System.IO;
using Newtonsoft.Json;
/// <summary>
/// Common 的摘要说明
/// </summary>
public class Common
{
    static string BaiDuApiUrl = "http://api.map.baidu.com/telematics/v2/weather";
    
    public Common()
	{
		//
		// TODO: 在此处添加构造函数逻辑
		//
	}

    ///// <summary>
    /// 请求服务器
    /// </summary>
    public static string RequestServer(string url, Dictionary<string, string> paraDic)
    {
        try
        {
            string paraStr = string.Empty;
            if (paraDic != null && paraDic.Count > 0)
            {
                foreach (string key in paraDic.Keys)
                {
                    if (string.IsNullOrEmpty(paraStr))
                        paraStr = key + "=" + paraDic[key];
                    else
                        paraStr += "&" + key + "=" + paraDic[key];
                }
            }

            byte[] bData = Encoding.UTF8.GetBytes(paraStr.ToString());

            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
            request.Method = "post";
            request.Timeout = 2000;
            request.ContentType = "application/x-www-form-urlencoded";
            request.ContentLength = bData.Length;

            System.IO.Stream smWrite = request.GetRequestStream();
            smWrite.Write(bData, 0, bData.Length);
            smWrite.Close();

            HttpWebResponse response = (HttpWebResponse)request.GetResponse();
            System.IO.Stream dataStream = response.GetResponseStream();
            System.IO.StreamReader reader = new System.IO.StreamReader(dataStream, Encoding.UTF8);
            string responseFromServer = reader.ReadToEnd();
            reader.Close();
            dataStream.Close();
            response.Close();

            return responseFromServer;
        }
        catch { }

        return null;
    }

    /// <summary>
    /// 获取用户当前区域温度
    /// </summary>
    /// <returns></returns>
    public static int GetTemperature()
    {
        Dictionary<string, string> paras = new Dictionary<string, string>();
        paras.Add("location", "上海");
        paras.Add("output", "json");
        paras.Add("ak", "D2ed409dbc6164d0d1b2b447fee086e8");

        string result = RequestServer(BaiDuApiUrl, paras);
        JavaScriptObject resultObj = (JavaScriptObject)JavaScriptConvert.DeserializeObject(result);
        JavaScriptArray temperatureArr = (JavaScriptArray)resultObj["results"];
        resultObj = ((JavaScriptObject)temperatureArr[0]);

        //string str = resultObj["temperature"].ToString ( );
        //string[] temp = str.Split ( new string[] { "\\u" }, StringSplitOptions.RemoveEmptyEntries );
        //for (int i = 0; i < temp.Length; i++)
        //    temp[i] = ((char)Convert.ToInt32 ( temp[i], 16 )).ToString ( );
        //str = string.Join ( "", temp );

        string temperature = resultObj["temperature"].ToString ( ).Replace ( "2103", "" );
        return int.Parse ( temperature );
    }

    /// <summary>
    /// 根据温度获取相关商铺关键字
    /// </summary>
    /// <param name="temperature">当前天气温度</param>
    /// <returns></returns>
    public static StringBuilder GetKeywordsByTemperature(int temperature)
    {
        StringBuilder keywords=new StringBuilder();
        if(temperature>0 && temperature>=10)
        {

        }
        else if(temperature>10 && temperature<16)
        {

        }
        else if(temperature>=16 && temperature<23)
        {

        }
         else if(temperature>=23 && temperature<33)
        {

        }
        else if (temperature >= 33 && temperature < 40)
        {

        }
        else
        {
 
        }
     
        return keywords;
    }

    /// <summary>
    /// 根据当前小时数获取相关商铺关键字
    /// </summary>
    /// <returns></returns>
    public static StringBuilder GetKeywordsByDateHour() 
    {
        StringBuilder keyword = new StringBuilder ( );
        DateTime datetime = DateTime.Now;
        int hour = datetime.Hour;
        if (hour >= 22 && hour <= 4)
            keyword.Append ( "  夜宵" );
        else if (hour >= 5 && hour <= 10)
            keyword.Append ( "  早餐" );
        else if (hour >= 11 && hour <= 12)
            keyword.Append ( "  夜宵" );
        else if (hour >= 13 && hour <= 16)
            keyword.Append ( "  下午茶" );
        else
            keyword.Append ( "  晚餐" );

        return keyword;

    }

    /// <summary>
    /// 根据当前月份获取相关商铺关键字
    /// </summary>
    /// <returns></returns>
    public static StringBuilder GetKeywordsByDateMonth()
    {
        StringBuilder keyword = new StringBuilder ( );
        DateTime datetime = DateTime.Now;
        int month = datetime.Month;

        switch (month)
        {
            case 12:
            case 1:
            case 2:
                keyword.Append ( "春" ); break;
            case 3:
            case 4:
            case 5:
                keyword.Append ( "夏" ); break;
            case 6:
            case 7:
            case 8:
                keyword.Append ( "秋" ); break;
            case 9:
            case 10:
            case 11:
                keyword.Append ( "冬" ); break;
            default:
                break;
        }

        return keyword;

    }

    /// <summary>
    /// 获取用户相关操作记录
    /// </summary>
    /// <returns></returns>
    public static StringBuilder GetKeywordsByUserLog()
    {
        StringBuilder keyword = new StringBuilder ( );
        XmlDocument doc = new XmlDocument ( );
        doc.Load ( HttpContext.Current.Server.MapPath ( "~/App_Data/userLog.xml" ) );

        XmlNodeList logList = doc.SelectNodes ( "userLog/log" );
        foreach (XmlNode log in logList)
        {
            string id = log.Attributes["id"].Value;
            keyword.Append ( id );
        }
        return keyword;
    }

}