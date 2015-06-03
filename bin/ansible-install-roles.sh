#!/bin/bash

set -e
ansible-galaxy install martinmicunda.common \
                       martinmicunda.nodejs \
                       martinmicunda.iojs \
                       martinmicunda.bower \
                       martinmicunda.gulp \
                       laggyluke.direnv \
                       retr0h.nsq \
                       savagegus.consul \
                       angstwad.docker_ubuntu \
                       franklinkim.docker-compose \
                       --force
