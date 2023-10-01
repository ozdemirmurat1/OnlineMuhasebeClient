export class TokenModel{
    token:string="";
    refreshToken:string="";
    // Datetime formatı c# ta ve angular da farklı bu yüzden refreshTokenExpires string değer atadık
    refreshTokenExpires:string="";
}