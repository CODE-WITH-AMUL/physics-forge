from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse



@login_required
