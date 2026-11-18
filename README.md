# Hoodlum Asylum

Public site for Hoodlum Asylum — music, film, games and ideas from Solihull, UK.

## Live

The redesigned site is served by GitHub Pages from this `main` branch.

- **Live now:** https://www.hoodlumasylum.com/
- GitHub Pages also uses this custom domain, so https://hoodlumasylum.github.io/asylum/ should redirect there.

`hoodlumasylum.com` (the apex, no `www`) is a different site. Its DNS still points at Vercel (A record `216.150.1.1`), through Wix nameservers (`ns0.wixdns.net`, `ns1.wixdns.net`). That app is unchanged. This repository does not change DNS or Wix.

To point **hoodlumasylum.com** at this GitHub Pages site later, in the Wix domain DNS:

1. Keep `www` as a CNAME to `hoodlumasylum.github.io`.
2. Change the apex A records for `hoodlumasylum.com` from `216.150.1.1` to GitHub Pages:

   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`

3. Optional IPv6: `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`.
4. In this repo, set the GitHub Pages custom domain (and the `CNAME` file) to `hoodlumasylum.com` if you want the apex to be the main address.
5. Wait for DNS and GitHub's HTTPS certificate.

## Updates

There is no build step. Every push to `main` republishes GitHub Pages (legacy deploy from `/` on `main`). Changes are usually live within a minute or two.

## Content

The Images and TikTok sections use every public TikTok from the accounts listed on the live TikTok section:

thehoodlumasylum, hoodlumasylumfilms, codeaque, codywinstonhenry, theconceptspace, hoodlumasylumgame.

Covers are stored in `img/tiktok/` and each card links back to the original post. Music is from BandLab; films are from YouTube.

The older Maat preview remains at `/maat/`.
