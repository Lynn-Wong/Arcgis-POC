FROM nginx:1.25

RUN rm -f /etc/nginx/nginx.conf

COPY nginx.conf /etc/nginx/nginx.conf
COPY variables.conf /etc/nginx/variables.conf
COPY dist/frontend/browser /usr/share/nginx/html

EXPOSE 4200

CMD ["nginx", "-g", "daemon off;"]