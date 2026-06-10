param(
  [int]$Port = 8123
)

$Root = [System.IO.Path]::GetFullPath($PSScriptRoot)
$RootWithSeparator = $Root.TrimEnd([System.IO.Path]::DirectorySeparatorChar) + [System.IO.Path]::DirectorySeparatorChar
$Listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Any, $Port)

function Get-ContentType {
  param([string]$Path)
  switch ([System.IO.Path]::GetExtension($Path).ToLowerInvariant()) {
    ".html" { "text/html; charset=utf-8"; break }
    ".css" { "text/css; charset=utf-8"; break }
    ".js" { "text/javascript; charset=utf-8"; break }
    ".json" { "application/json; charset=utf-8"; break }
    ".png" { "image/png"; break }
    ".jpg" { "image/jpeg"; break }
    ".jpeg" { "image/jpeg"; break }
    ".webp" { "image/webp"; break }
    default { "application/octet-stream" }
  }
}

function Send-Response {
  param(
    [System.Net.Sockets.NetworkStream]$Stream,
    [int]$Status,
    [string]$StatusText,
    [byte[]]$Body,
    [string]$ContentType = "text/plain; charset=utf-8"
  )

  $Header = "HTTP/1.1 $Status $StatusText`r`nContent-Type: $ContentType`r`nContent-Length: $($Body.Length)`r`nConnection: close`r`n`r`n"
  $HeaderBytes = [System.Text.Encoding]::ASCII.GetBytes($Header)
  $Stream.Write($HeaderBytes, 0, $HeaderBytes.Length)
  $Stream.Write($Body, 0, $Body.Length)
}

try {
  $Listener.Start()
  Write-Host "Grimorio Arcano rodando em http://localhost:$Port"
  Write-Host "Na mesma rede, tente abrir pelo IP deste computador na porta $Port."
  Write-Host "Pressione Ctrl+C para parar."

  while ($true) {
    $Client = $Listener.AcceptTcpClient()
    try {
      $Stream = $Client.GetStream()
      $Reader = [System.IO.StreamReader]::new($Stream, [System.Text.Encoding]::ASCII, $false, 1024, $true)
      $RequestLine = $Reader.ReadLine()

      if ([string]::IsNullOrWhiteSpace($RequestLine)) {
        continue
      }

      while ($true) {
        $Line = $Reader.ReadLine()
        if ([string]::IsNullOrEmpty($Line)) { break }
      }

      $Parts = $RequestLine.Split(" ")
      $UrlPath = [Uri]::UnescapeDataString($Parts[1].Split("?")[0])
      if ($UrlPath -eq "/") { $UrlPath = "/index.html" }
      $RelativePath = $UrlPath.TrimStart("/").Replace("/", [System.IO.Path]::DirectorySeparatorChar)
      $Target = [System.IO.Path]::GetFullPath([System.IO.Path]::Combine($Root, $RelativePath))

      if (-not $Target.StartsWith($RootWithSeparator, [System.StringComparison]::OrdinalIgnoreCase)) {
        $Body = [System.Text.Encoding]::UTF8.GetBytes("Forbidden")
        Send-Response -Stream $Stream -Status 403 -StatusText "Forbidden" -Body $Body
        continue
      }

      if (-not [System.IO.File]::Exists($Target)) {
        $Body = [System.Text.Encoding]::UTF8.GetBytes("Not found")
        Send-Response -Stream $Stream -Status 404 -StatusText "Not Found" -Body $Body
        continue
      }

      $Bytes = [System.IO.File]::ReadAllBytes($Target)
      Send-Response -Stream $Stream -Status 200 -StatusText "OK" -Body $Bytes -ContentType (Get-ContentType -Path $Target)
    }
    finally {
      $Client.Close()
    }
  }
}
finally {
  $Listener.Stop()
}
