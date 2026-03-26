FROM registry.chengdu.local/osp/nginx:1.21.4
RUN rm -f /etc/nginx/nginx.conf && \
    rm -rf /etc/nginx/conf.d/*  && \
    rm -f /etc/nginx/variables.conf  && \
    rm -f /etc/nginx/variables.conf:1

COPY nginx.conf /etc/nginx/nginx.conf
COPY dist/frontend/browser /usr/share/nginx/html

EXPOSE 4200

CMD ["nginx", "-g", "daemon off;"]
