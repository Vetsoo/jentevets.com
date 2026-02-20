# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal website for Jente Vets with two versions:
- **v1/**: ASP.NET Core 6 application using Piranha CMS (content management system)
- **v2/**: New website version (currently empty, work in progress)

## Development Commands

### v1 (Piranha CMS)

```bash
# Build
cd v1 && dotnet build

# Run locally
cd v1 && dotnet run

# Build for release
cd v1 && dotnet publish -c Release
```

### Prerequisites for v1

- SQL Server LocalDB (connection: `(localdb)\MSSQLLocalDB`, database: `JenteVets`)
- Azurite or Azure Blob Storage emulator for local blob storage (port 10000)

## Architecture (v1)

The v1 site is built on Piranha CMS 10.1 with:
- **SQL Server** backend for content and identity
- **Azure Blob Storage** for media files (Azurite for local dev)
- **TinyMCE** as the content editor
- **ImageSharp** for image processing
- **ASP.NET Core Identity** for authentication

Entry point is `v1/Program.cs` which configures the Piranha pipeline. Content types are auto-discovered via `ContentTypeBuilder` scanning the assembly.

Manager interface available at `/manager` when running.

## Instructions
- Don't make commits