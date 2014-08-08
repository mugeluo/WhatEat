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
    public static string GetTemperature()
    {
        Dictionary<string, string> paras = new Dictionary<string, string>();
        paras.Add("location", "上海");
        paras.Add("output", "json");
        paras.Add("ak", "D2ed409dbc6164d0d1b2b447fee086e8");

        string result = RequestServer(BaiDuApiUrl, paras);
        JavaScriptObject resultObj = (JavaScriptObject)JavaScriptConvert.DeserializeObject(result);
        JavaScriptArray temperatureArr = (JavaScriptArray)resultObj["results"];
        resultObj = ((JavaScriptObject)temperatureArr[0]);

        string temperature = resultObj["temperature"].ToString().Replace("℃", "");
        return temperature;
        //return int.Parse(temperature);
    }

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

    public static StringBuilder GetKeywordsByDateHour() 
    {
        StringBuilder kerwords = new StringBuilder();
        DateTime datetime = DateTime.Now;
        int hour = datetime.Hour;

        return kerwords;

    }

    public static StringBuilder GetKeywordsByDateMonth()
    {
        StringBuilder kerwords = new StringBuilder();
        DateTime datetime = DateTime.Now;
        int month = datetime.Month;

        return kerwords;

    }

    public static StringBuilder GetKeywordsByUserLog()
    {
        StringBuilder kerwords = new StringBuilder ( );
        XmlDocument doc = new XmlDocument ( );
        doc.Load ( HttpContext.Current.Server.MapPath ( "~/App_Data/userLog.xml" ) );

        XmlNodeList logList = doc.SelectNodes ( "userLog/log" );
        foreach (XmlNode log in logList)
        {
            string id = log.Attributes["id"].Value;
            kerwords.Append ( id );
        }
        return kerwords;
    }

}