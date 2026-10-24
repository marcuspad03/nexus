// NEXUS für Windows: liefert die Web-App lokal aus und öffnet sie im Standardbrowser.
// Der feste Port hält die Browser-Daten (API-Schlüssel, Konten) zwischen Starts zusammen.
package main

import (
	"embed"
	"fmt"
	"io/fs"
	"net"
	"net/http"
	"os"
	"os/exec"
	"runtime"
)

//go:embed web
var webFiles embed.FS

const addr = "127.0.0.1:47821"

func openBrowser(url string) {
	switch runtime.GOOS {
	case "windows":
		exec.Command("rundll32", "url.dll,FileProtocolHandler", url).Start()
	case "darwin":
		exec.Command("open", url).Start()
	default:
		exec.Command("xdg-open", url).Start()
	}
}

func main() {
	url := "http://" + addr + "/"
	ln, err := net.Listen("tcp", addr)
	if err != nil {
		// Läuft schon (oder Port belegt): nur den Browser öffnen.
		openBrowser(url)
		return
	}
	root, _ := fs.Sub(webFiles, "web")
	fmt.Println("NEXUS läuft unter " + url)
	fmt.Println("Dieses Fenster offen lassen. Schließen beendet NEXUS.")
	openBrowser(url)
	if err := http.Serve(ln, http.FileServer(http.FS(root))); err != nil {
		fmt.Println("Fehler:", err)
		fmt.Println("Enter zum Beenden …")
		fmt.Scanln()
		os.Exit(1)
	}
}
