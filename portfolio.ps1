try {
    $Host.UI.RawUI.WindowTitle = "Maria's Portfolio"
}
catch {
}

$esc = [char]27
$script:RenderLines = [System.Collections.Generic.List[string]]::new()
$script:IsPlainOutput = $env:PORTFOLIO_PLAIN_OUTPUT -eq "1"

function Get-RenderWidth {
    try {
        return [Math]::Max(72, [Console]::WindowWidth - 2)
    }
    catch {
        return 80
    }
}

function Get-LineWidth {
    try {
        return [Math]::Max(60, [Console]::WindowWidth - 2)
    }
    catch {
        return 78
    }
}

function C($code, $text) {
    return "$esc[$code" + "m$text$esc[0m"
}

function Link($text, $url) {
    return "$esc]8;;$url$esc\$text$esc]8;;$esc\"
}

function Line($char = "-") {
    $width = Get-LineWidth
    return ($char * $width)
}

function Add-Line($text = "") {
    $script:RenderLines.Add($text) | Out-Null
}

function Add-VerticalPadding {
    param([int]$ContentHeight)

    try {
        $windowHeight = [Console]::WindowHeight
    }
    catch {
        $windowHeight = $ContentHeight
    }
    $topPadding = [Math]::Max(0, [Math]::Floor(($windowHeight - $ContentHeight) / 2))

    for ($i = 0; $i -lt $topPadding; $i++) {
        Write-Host ""
    }
}

function Flush-RenderLines {
    if (-not $script:IsPlainOutput) {
        Clear-Host
        Add-VerticalPadding -ContentHeight $script:RenderLines.Count
    }

    foreach ($line in $script:RenderLines) {
        if ($script:IsPlainOutput) {
            Write-Output $line
        }
        else {
            Write-Host $line
        }
    }

    if ($script:IsPlainOutput) {
        Write-Output ""
        Write-Output ""
    }
    else {
        Write-Host ""
        Write-Host ""
    }
}

function Section($title) {
    Add-Line ""
    Add-Line (C "38;2;180;120;255" (Line "="))
    Add-Line (C "1;97" ("  " + $title))
    Add-Line (C "38;2;180;120;255" (Line "="))
}

function KV($label, $value, $labelColor = "1;36") {
    $left = C $labelColor ($label.PadRight(12))
    Add-Line ("  " + $left + " " + $value)
}

function Project {
    param(
        [Parameter(ValueFromRemainingArguments = $true)]
        [string[]]$Lines
    )

    if ($Lines.Count -lt 3) {
        Add-Line "Project needs at least 3 lines: name, stack, link"
        return
    }

    $name  = $Lines[0]
    $stack = $Lines[1]
    $link  = $Lines[$Lines.Count - 1]

    Add-Line ""
    Add-Line ("  " + (C "1;95" $name))
    Add-Line ("  " + (C "90" "stack   ") + " " + $stack)

    for ($i = 2; $i -lt ($Lines.Count - 1); $i++) {
        if ($i -eq 2) {
            Add-Line ("  " + (C "90" "about   ") + " " + $Lines[$i])
        }
        else {
            Add-Line ("  " + (" " * 10) + $Lines[$i])
        }
    }

    Add-Line ("  " + (C "90" "link    ") + " " + $link)
}

$width = Get-RenderWidth
$topbot = "+" + ("-" * ($width - 2)) + "+"

Add-Line (C "38;2;120;255;210" $topbot)

$headline = " MARIA | Developer / Filmmaking / Content Creation "
$headlinePad = [Math]::Max(0, $width - 2 - $headline.Length)
$leftPad = [Math]::Floor($headlinePad / 2)
$rightPad = $headlinePad - $leftPad
Add-Line (
    (C "38;2;120;255;210" "|") +
    (" " * $leftPad) +
    (C "1;97" $headline) +
    (" " * $rightPad) +
    (C "38;2;120;255;210" "|")
)

$sub = " welcome to my portfolio! "
$subPad = [Math]::Max(0, $width - 2 - $sub.Length)
$subLeft = [Math]::Floor($subPad / 2)
$subRight = $subPad - $subLeft
Add-Line (
    (C "38;2;120;255;210" "|") +
    (" " * $subLeft) +
    (C "38;2;180;180;180" $sub) +
    (" " * $subRight) +
    (C "38;2;120;255;210" "|")
)

Add-Line (C "38;2;120;255;210" $topbot)

Section "PROFILE"
KV "name"   "Maria Hall"
KV "focus"  "Programming, problem-solving, filmmaking, VFX"
KV "style"  "Creative tools, cute sites, visual projects"
KV "status" (C "32" "Open to cool projects and work")

Section "ABOUT"
Add-Line "  I love making projects that solve problems and look fun!"
Add-Line "  websites, tools, video creation, graphics,"
Add-Line "  and interactive ideas are the kind of work I enjoy most."
Add-Line ("  Check out my GitHub at " + (Link "github.com/theminji" "https://github.com/theminji"))

Section "SKILLS"
KV "code"   "Python, Rust, HTML/CSS, scripting"
KV "video"  "Editing, motion graphics, post workflows"
KV "vfx"    "Compositing, visual polish, experimentation"
KV "tools"  "CLI workflows, automation, creative software"

Section "FEATURED PROJECTS"
Project `
    "Portfolio" `
    "Tailwind / CSS / Cloud hosting" `
    "You're looking at it now! I wanted something unique and fun to represent me." `
    (Link "airamx112.com" "https://airamx112.com")

Project `
    "VType" `
    "Rust / Python / AI" `
    "Small tool for voice typing on Linux and Windows." `
    "I was tired of not having accurate transcription tools on my computer," `
    "so I made my own tool and open sourced it!" `
    (Link "github.com/theminji/VType" "https://github.com/theminji/VType")

Project `
    "TTS MCP Server" `
    "Python / MCP / AI" `
    "A simple text-to-speech MCP server for local AI to generate speech files with." `
    "I was shocked that LM Studio didn't have any local TTS servers, so I created one." `
    "It uses Supertonic-2 TTS for the backend, which runs faster than realtime!" `
    (Link "github.com/theminji/tts-mcp" "https://github.com/theminji/tts-mcp")

Project `
    "Lemod AI Discord moderator" `
    "Python / Discord.py / OpenAI Moderation Toolkit" `
    "I created a Discord bot that utilizes the OpenAI moderation toolkit to automatically" `
    "moderate users, and also allows for admin command using natural language" `
    "via LLM tool calls. This bot was developed specifically for the MattVidPro AI Discord server." `
    (Link "discord.gg/mattvidpro" "https://discord.gg/mattvidpro")

Section "NOW"
Add-Line ("  " + (C "32" "*") + " exploring creative coding")
Add-Line ("  " + (C "36" "*") + " creating ai models")
Add-Line ("  " + (C "35" "*") + " mixing dev + film + VFX work")

Section "CONTACT"
KV "email"  (C "36" "maria.a.hall.112@gmail.com")
KV "github" (C "36" (Link "github.com/theminji" "https://github.com/theminji"))
KV "site"   (C "36" (Link "airamx112.com" "https://airamx112.com"))
KV "status" "Send me a message on Discord if you are interested! @theminji"

Add-Line ""
Add-Line (C "38;2;255;120;180" (Line "="))
Add-Line ("  " + (C "1;97" "thanks for visiting my portfolio!"))
Add-Line (C "38;2;255;120;180" (Line "="))

Flush-RenderLines
