# .Net Core 7 ile React Js Örneği 
Bu projede .net core 7 ile crud işlemlerini api üzerinden yaparken frontend de ise react js ile bir arayüz hazırlanmıştır.

## Örnekte kullanılan teknolojiler
- .Net Core 7 Web Api
- EntityFrameworkCore
- React JS
- Postgresql
- Docker

## Dizinler
- reactclientapp : React Projesinin olduğu dizin
- SampleDotNetCoreReactApi: .Net Core Projesinin olduğu dizin (API)
- SampleDotNetCoreReactTest: .Net Core Projesinin Test Projesi

## Kurulum ve Çalıştırma

Varsayılan portlar kullanıldığından docker-compose up komutu verilmeden önce docker-compose.yml içinde belirtilen 80, 8080, 8081, 5342 portlarının bilgisayarınızda boşta olduğundan emin olunuz.

```sh
git clone git@github.com:birtanyildiz/sample-dotnetcore-react-app.git
docker-compose up
````
komutu verilerek postgresql veritabanı, adminer veritabanı yöneticisi, react uygulaması ve dotnet core uygulaması ayağa kaldırılarak "_localhost_" adresi ile uygulama test edilebilir.

### Test
docker-compose up ile proje ayağa kalktıktan sonra, terminalden

```sh
cd SampleDotnetCoreReactTest
dotnet test
````
ile unit testler çalıştırılabilir. (Macos Visual Studio Kullandığımdan Windows için nasıl tepki verdiğini bilmiyorum. bu yöntem ile testi çalıştırabilirsiniz.)

### Geliştirme için 
Geliştirme kurulumu yapmak için dotnet core tarafında yapılan geliştirmeler için yalnızca visual studio ile açmak yeterli.

React native tarafındaki geliştirmeler için reactclientapp dizinine giderek
```sh
npm install
```

Komutu verilerek node_modules oluşması sağlanmalı. Sonrasında 

```sh
npm start
````

komutu ile react development sunucusu çalıştırılabilir.
