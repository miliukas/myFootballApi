using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text;
using System.Security.Cryptography;

namespace MyFootballApi.Models
{
    public class EncDecService
    {
        public static string IV = "qwf3q1q2g1qw20qg"; //16 chars = 128bytes
        private static string Key = "4_Asf1+4^$!asfasfvc69bn%lsq2`wzx"; //32 chars = 256bytes

        public static string Encrypt(string decrypted)
        {
            byte[] textBytes = ASCIIEncoding.ASCII.GetBytes(decrypted);
            AesCryptoServiceProvider encdec = new AesCryptoServiceProvider();
            encdec.BlockSize = 128;
            encdec.KeySize = 256;
            encdec.Key = ASCIIEncoding.ASCII.GetBytes(Key);
            encdec.IV = ASCIIEncoding.ASCII.GetBytes(IV);
            encdec.Padding = PaddingMode.PKCS7;
            encdec.Mode = CipherMode.CBC;

            ICryptoTransform icrypt = encdec.CreateEncryptor(encdec.Key, encdec.IV);

            byte[] enc = icrypt.TransformFinalBlock(textBytes, 0, textBytes.Length);

            icrypt.Dispose();

            return Convert.ToBase64String(enc);
        }


        public static string Decrypt(string encrypted)
        {
            byte[] encbytes = Convert.FromBase64String(encrypted);
            AesCryptoServiceProvider encdec = new AesCryptoServiceProvider();
            encdec.BlockSize = 128;
            encdec.KeySize = 256;
            encdec.Key = ASCIIEncoding.ASCII.GetBytes(Key);
            encdec.IV = ASCIIEncoding.ASCII.GetBytes(IV);
            encdec.Padding = PaddingMode.PKCS7;
            encdec.Mode = CipherMode.CBC;

            ICryptoTransform icrypt = encdec.CreateDecryptor(encdec.Key, encdec.IV);

            byte[] dec = icrypt.TransformFinalBlock(encbytes, 0, encbytes.Length);

            icrypt.Dispose();

            return ASCIIEncoding.ASCII.GetString(dec);
        }

    }
}